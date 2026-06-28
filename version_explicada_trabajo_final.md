# Version explicada y resolucion guia del Trabajo Final

## 1. Que tan complejo seria hacerlo como tecnico en informatica

Para una persona tecnica en informatica, este trabajo es de dificultad media. No exige programar un sistema completo ni construir una aplicacion, pero si exige manejar bien bases de datos relacionales y SQL. Lo mas importante es entender como se conectan las tablas del modelo: personas, estudiantes, academicos, administrativos, directivos, carreras, facultades, departamentos, asignaturas, secciones, inscripciones y mallas curriculares.

La parte tecnica se concentra en:

- Usar `JOIN` para cruzar tablas relacionadas.
- Agrupar datos con `GROUP BY`.
- Calcular promedios, conteos y porcentajes con `AVG`, `COUNT`, `SUM` y expresiones matematicas.
- Filtrar datos con `WHERE` y `HAVING`.
- Crear columnas de analisis con `CASE`.
- Usar subconsultas o tablas temporales logicas con `WITH`.

La parte mas delicada no es escribir una consulta aislada, sino interpretar los resultados con criterio. El informe no debe quedarse en "la consulta devuelve una tabla", sino explicar que significa esa tabla para la universidad: rendimiento, riesgo academico, carga docente, equidad, ingresos proyectados, desercion, eficiencia o planificacion.

En tiempo estimado, si la base de datos esta lista y el modelo es igual al diagrama, una persona con base tecnica podria resolver las consultas en unas 8 a 16 horas. El informe, graficos, revision APA y redaccion pueden tomar otras 6 a 12 horas. La dificultad sube si los nombres reales de columnas no coinciden exactamente con el modelo o si los datos vienen sucios.

## 2. Supuestos usados para las consultas

Las consultas estan escritas para SQLite y siguen el modelo del enunciado. Si la base real usa nombres con tildes, mayusculas distintas o valores diferentes, habra que ajustar los textos exactos.

Supuestos principales:

- Una nota bajo 4.0 se considera reprobada.
- La columna `estado` de `inscripciones` puede contener valores como `Activa`, `Aprobado` o `Reprobado`.
- La columna `estado` de `estudiantes` puede contener valores como `Regular`, `Suspendido`, `Eliminado`, `Egresado` o `Titulado`.
- El año operativo del trabajo es 2026.
- Los calculos financieros son simulaciones usando valores proxy indicados por el enunciado.
- Donde se pide "vigente" o "actual", se filtra por 2026 y, cuando corresponde, por semestre 1 o estado activo.

## 3. Objetivo general del trabajo

El objetivo del trabajo es demostrar que se puede pasar desde una base de datos operacional a informacion util para tomar decisiones. La base no se analiza por curiosidad tecnica: se analiza para responder preguntas de gestion universitaria. Por eso cada consulta debe tener tres elementos:

1. Una pregunta de negocio clara.
2. Una consulta SQL que entregue el dato agregado correcto.
3. Una interpretacion que explique por que ese resultado importa.

---

# Grupo 1: Gestion Academica y Control de Estudios

Este bloque busca evaluar rendimiento estudiantil, aprobacion, alertas academicas, carga de cursos, capacidad de secciones y coherencia entre mallas y oferta academica.

## 1. Rendimiento promedio por carrera

Explicacion simple: se quiere saber en que carreras los estudiantes han tenido mejores notas historicas. Para eso se juntan estudiantes, carreras, inscripciones y secciones, porque la nota esta en la inscripcion y la carrera esta asociada al estudiante.

SQL:

```sql
SELECT
    c.nombre AS carrera,
    ROUND(AVG(i.nota_final), 2) AS promedio_historico
FROM estudiantes e
JOIN carreras c ON c.id_carrera = e.id_carrera
JOIN inscripciones i ON i.id_estudiante = e.id_estudiante
WHERE i.nota_final IS NOT NULL
GROUP BY c.id_carrera, c.nombre
ORDER BY promedio_historico DESC;
```

Que se busca lograr: comparar carreras segun rendimiento academico acumulado. Sirve para acreditacion, mejora curricular y deteccion de programas que requieren apoyo.

## 2. Tasa de reprobacion por asignatura en 2026

Explicacion simple: se busca identificar asignaturas dificiles, midiendo que porcentaje de alumnos obtuvo nota menor a 4.0 durante 2026.

SQL:

```sql
SELECT
    a.codigo,
    a.nombre AS asignatura,
    COUNT(i.id_inscripcion) AS total_evaluados,
    SUM(CASE WHEN i.nota_final < 4.0 THEN 1 ELSE 0 END) AS total_reprobados,
    ROUND(
        100.0 * SUM(CASE WHEN i.nota_final < 4.0 THEN 1 ELSE 0 END)
        / COUNT(i.id_inscripcion),
        2
    ) AS porcentaje_reprobacion
FROM asignaturas a
JOIN secciones s ON s.id_asignatura = a.id_asignatura
JOIN inscripciones i ON i.id_seccion = s.id_seccion
WHERE s.anio = 2026
  AND i.nota_final IS NOT NULL
GROUP BY a.id_asignatura, a.codigo, a.nombre
ORDER BY porcentaje_reprobacion DESC;
```

Que se busca lograr: detectar cuellos de botella academicos. Una asignatura con alta reprobacion puede requerir tutorias, revision de evaluaciones o ajustes metodologicos.

## 3. Alumnos en alerta academica

Explicacion simple: se quiere listar estudiantes que siguen activos como regulares, pero cuyo promedio historico es bajo. Son candidatos a apoyo temprano.

SQL:

```sql
SELECT
    p.rut,
    p.nombres || ' ' || p.apellidos AS estudiante,
    c.nombre AS carrera,
    ROUND(AVG(i.nota_final), 2) AS promedio_acumulado
FROM estudiantes e
JOIN personas p ON p.id_persona = e.id_persona
JOIN carreras c ON c.id_carrera = e.id_carrera
JOIN inscripciones i ON i.id_estudiante = e.id_estudiante
WHERE e.estado = 'Regular'
  AND i.nota_final IS NOT NULL
GROUP BY e.id_estudiante, p.rut, estudiante, c.nombre
HAVING AVG(i.nota_final) < 4.0
ORDER BY promedio_acumulado ASC;
```

Que se busca lograr: apoyar la toma de decisiones de tutorias, orientacion academica y retencion estudiantil.

## 4. Carga academica excesiva

Explicacion simple: se revisa si un estudiante tiene mas inscripciones activas de las esperadas en el mismo periodo. El enunciado dice "mas de 1", aunque academicamente podria ser mas razonable usar un umbral mayor.

SQL:

```sql
SELECT
    e.id_estudiante,
    p.rut,
    p.nombres || ' ' || p.apellidos AS estudiante,
    COUNT(i.id_inscripcion) AS inscripciones_activas
FROM estudiantes e
JOIN personas p ON p.id_persona = e.id_persona
JOIN inscripciones i ON i.id_estudiante = e.id_estudiante
JOIN secciones s ON s.id_seccion = i.id_seccion
WHERE s.anio = 2026
  AND s.semestre = 1
  AND i.estado = 'Activa'
GROUP BY e.id_estudiante, p.rut, estudiante
HAVING COUNT(i.id_inscripcion) > 1
ORDER BY inscripciones_activas DESC;
```

Que se busca lograr: auditar casos de posible sobrecarga o inconsistencias de inscripcion.

## 5. Efectividad docente por categoria

Explicacion simple: se revisa si las notas promedio de los estudiantes cambian segun la categoria del profesor que dicta la seccion.

SQL:

```sql
SELECT
    ac.categoria,
    COUNT(i.id_inscripcion) AS total_notas,
    ROUND(AVG(i.nota_final), 2) AS promedio_notas
FROM academicos ac
JOIN secciones s ON s.id_academico = ac.id_academico
JOIN inscripciones i ON i.id_seccion = s.id_seccion
WHERE i.nota_final IS NOT NULL
GROUP BY ac.categoria
ORDER BY promedio_notas DESC;
```

Que se busca lograr: observar diferencias de rendimiento asociadas a categorias docentes. No prueba causalidad por si solo, pero entrega una senal para analisis institucional.

## 6. Asignaturas huerfanas de oferta

Explicacion simple: se buscan asignaturas que existen en una malla curricular, pero que no tuvieron secciones abiertas durante 2025.

SQL:

```sql
SELECT DISTINCT
    a.codigo,
    a.nombre AS asignatura
FROM mallas_curriculares mc
JOIN asignaturas a ON a.id_asignatura = mc.id_asignatura
WHERE NOT EXISTS (
    SELECT 1
    FROM secciones s
    WHERE s.id_asignatura = a.id_asignatura
      AND s.anio = 2025
)
ORDER BY a.codigo;
```

Que se busca lograr: detectar problemas de oferta academica. Si una asignatura obligatoria no se dicta, puede afectar avance curricular.

## 7. Cuadro de honor de Ingenieria Civil Informatica

Explicacion simple: se seleccionan los cinco estudiantes de una carrera especifica con mejor promedio historico.

SQL:

```sql
SELECT
    p.rut,
    p.nombres || ' ' || p.apellidos AS estudiante,
    c.nombre AS carrera,
    ROUND(AVG(i.nota_final), 2) AS promedio_general
FROM estudiantes e
JOIN personas p ON p.id_persona = e.id_persona
JOIN carreras c ON c.id_carrera = e.id_carrera
JOIN inscripciones i ON i.id_estudiante = e.id_estudiante
WHERE c.nombre = 'Ingenieria Civil Informatica'
  AND i.nota_final IS NOT NULL
GROUP BY e.id_estudiante, p.rut, estudiante, c.nombre
ORDER BY promedio_general DESC
LIMIT 5;
```

Que se busca lograr: reconocer excelencia academica y generar informacion para becas, distinciones o programas de ayudantia.

## 8. Alerta de capacidad e infraestructura

Explicacion simple: se identifican secciones donde la cantidad real de inscritos alcanzo o supero los cupos planificados.

SQL:

```sql
SELECT
    s.id_seccion,
    a.codigo,
    a.nombre AS asignatura,
    s.anio,
    s.semestre,
    s.cupos,
    COUNT(i.id_inscripcion) AS inscritos_reales
FROM secciones s
JOIN asignaturas a ON a.id_asignatura = s.id_asignatura
LEFT JOIN inscripciones i ON i.id_seccion = s.id_seccion
GROUP BY s.id_seccion, a.codigo, a.nombre, s.anio, s.semestre, s.cupos
HAVING COUNT(i.id_inscripcion) >= s.cupos
ORDER BY inscritos_reales DESC;
```

Que se busca lograr: apoyar decisiones de salas, cupos, apertura de nuevas secciones y asignacion docente.

## 9. Permanencia por cohorte

Explicacion simple: se agrupan estudiantes egresados o titulados por año de ingreso para observar que cohortes ya lograron finalizar.

SQL:

```sql
SELECT
    e.anio_ingreso AS cohorte,
    COUNT(*) AS total_egresados_o_titulados
FROM estudiantes e
WHERE e.estado IN ('Egresado', 'Titulado')
GROUP BY e.anio_ingreso
ORDER BY e.anio_ingreso;
```

Que se busca lograr: medir avance y cierre de trayectorias academicas por generacion de ingreso.

## 10. Densidad de creditos por malla

Explicacion simple: se suma el total de creditos obligatorios que exige cada carrera segun su malla.

SQL:

```sql
SELECT
    c.nombre AS carrera,
    SUM(a.creditos) AS total_creditos_obligatorios
FROM carreras c
JOIN mallas_curriculares mc ON mc.id_carrera = c.id_carrera
JOIN asignaturas a ON a.id_asignatura = mc.id_asignatura
WHERE mc.tipo = 'Obligatoria'
GROUP BY c.id_carrera, c.nombre
ORDER BY total_creditos_obligatorios DESC;
```

Que se busca lograr: comparar carga curricular planificada entre carreras.

---

# Grupo 2: Analisis de Personas y Recursos Humanos

Este bloque busca describir la composicion del personal, revisar equidad de genero, contratos, edad, carga institucional y consistencia de datos.

## 1. Representacion de genero en cargos directivos

Explicacion simple: se calcula que porcentaje de los directivos corresponde a cada genero.

SQL:

```sql
SELECT
    p.genero,
    COUNT(*) AS total_directivos,
    ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM directivos), 2) AS porcentaje
FROM directivos d
JOIN personas p ON p.id_persona = d.id_persona
GROUP BY p.genero
ORDER BY porcentaje DESC;
```

Que se busca lograr: medir representacion en liderazgo institucional.

## 2. Edad promedio del cuerpo docente por departamento

Explicacion simple: se calcula la edad aproximada de cada academico al año 2026 y luego el promedio por departamento.

SQL:

```sql
SELECT
    dep.nombre AS departamento,
    ROUND(AVG(2026 - CAST(strftime('%Y', p.fecha_nacimiento) AS INTEGER)), 1) AS edad_promedio
FROM academicos ac
JOIN personas p ON p.id_persona = ac.id_persona
JOIN departamentos dep ON dep.id_departamento = ac.id_departamento
GROUP BY dep.id_departamento, dep.nombre
ORDER BY edad_promedio DESC;
```

Que se busca lograr: planificar renovacion, sucesion y distribucion etaria del personal docente.

## 3. Balance contractual por facultad

Explicacion simple: se cuentan academicos de planta y honorarios por facultad.

SQL:

```sql
SELECT
    f.nombre AS facultad,
    SUM(CASE WHEN ac.tipo_contrato = 'Planta' THEN 1 ELSE 0 END) AS academicos_planta,
    SUM(CASE WHEN ac.tipo_contrato = 'Honorarios' THEN 1 ELSE 0 END) AS academicos_honorarios
FROM academicos ac
JOIN departamentos dep ON dep.id_departamento = ac.id_departamento
JOIN facultades f ON f.id_facultad = dep.id_facultad
GROUP BY f.id_facultad, f.nombre
ORDER BY f.nombre;
```

Que se busca lograr: auditar dependencia de personal estable versus personal a honorarios.

## 4. Brecha de genero en jerarquia academica

Explicacion simple: se mira si hombres y mujeres se distribuyen de forma equilibrada en categorias academicas.

SQL:

```sql
SELECT
    ac.categoria,
    SUM(CASE WHEN p.genero = 'Masculino' THEN 1 ELSE 0 END) AS hombres,
    SUM(CASE WHEN p.genero = 'Femenino' THEN 1 ELSE 0 END) AS mujeres,
    COUNT(*) AS total
FROM academicos ac
JOIN personas p ON p.id_persona = ac.id_persona
GROUP BY ac.categoria
ORDER BY ac.categoria;
```

Que se busca lograr: detectar posibles desigualdades en progresion academica.

## 5. Alerta de sucesion y jubilacion

Explicacion simple: se listan academicos de planta con 60 o mas años al 2026.

SQL:

```sql
SELECT
    p.nombres || ' ' || p.apellidos AS academico,
    dep.nombre AS departamento,
    2026 - CAST(strftime('%Y', p.fecha_nacimiento) AS INTEGER) AS edad
FROM academicos ac
JOIN personas p ON p.id_persona = ac.id_persona
JOIN departamentos dep ON dep.id_departamento = ac.id_departamento
WHERE ac.tipo_contrato = 'Planta'
  AND (2026 - CAST(strftime('%Y', p.fecha_nacimiento) AS INTEGER)) >= 60
ORDER BY edad DESC;
```

Que se busca lograr: anticipar necesidades de reemplazo, contratacion y transferencia de conocimiento.

## 6. Gestion de clima interno

Explicacion simple: se obtiene una lista de administrativos de cargos especificos que cumplen años en junio.

SQL:

```sql
SELECT
    p.nombres || ' ' || p.apellidos AS administrativo,
    p.email,
    ad.cargo,
    p.fecha_nacimiento
FROM administrativos ad
JOIN personas p ON p.id_persona = ad.id_persona
WHERE ad.cargo IN ('Soporte TI', 'Coordinador Academico')
  AND strftime('%m', p.fecha_nacimiento) = '06'
ORDER BY strftime('%d', p.fecha_nacimiento), administrativo;
```

Que se busca lograr: automatizar acciones de bienestar, reconocimiento interno o comunicaciones.

## 7. Dotacion total por departamento

Explicacion simple: se suman academicos y administrativos por departamento.

SQL:

```sql
WITH dotacion AS (
    SELECT id_departamento, id_academico AS id_empleado
    FROM academicos
    UNION ALL
    SELECT id_departamento, id_administrativo AS id_empleado
    FROM administrativos
)
SELECT
    dep.nombre AS departamento,
    COUNT(*) AS total_empleados
FROM dotacion d
JOIN departamentos dep ON dep.id_departamento = d.id_departamento
GROUP BY dep.id_departamento, dep.nombre
ORDER BY total_empleados DESC;
```

Que se busca lograr: medir concentracion de personal y necesidades de soporte por unidad.

## 8. Distribucion de cuentas institucionales activas

Explicacion simple: se cuentan correos administrativos y estudiantiles segun dominio.

SQL:

```sql
SELECT
    CASE
        WHEN email LIKE '%@alumno.ucen.cl' THEN 'Dominio estudiantil'
        WHEN email LIKE '%@ucen.cl' THEN 'Dominio administrativo'
        ELSE 'Otro dominio'
    END AS tipo_correo,
    COUNT(*) AS total_personas
FROM personas
GROUP BY tipo_correo
ORDER BY total_personas DESC;
```

Que se busca lograr: auditar cuentas institucionales y segmentar usuarios.

## 9. Densidad de alumnos por director de carrera

Explicacion simple: se cuenta cuantos estudiantes regulares dependen de cada jefe de carrera.

SQL:

```sql
SELECT
    pd.nombres || ' ' || pd.apellidos AS jefe_carrera,
    c.nombre AS carrera,
    COUNT(e.id_estudiante) AS estudiantes_regulares
FROM carreras c
JOIN directivos d ON d.id_directivo = c.id_jefe_carrera
JOIN personas pd ON pd.id_persona = d.id_persona
LEFT JOIN estudiantes e
    ON e.id_carrera = c.id_carrera
   AND e.estado = 'Regular'
GROUP BY d.id_directivo, jefe_carrera, c.nombre
ORDER BY estudiantes_regulares DESC;
```

Que se busca lograr: evaluar carga de supervision academica por directivo.

## 10. Auditoria de RUT terminados en K por rol

Explicacion simple: se cuentan personas cuyo RUT termina en K, separando estudiantes, academicos y administrativos.

SQL:

```sql
SELECT 'Estudiante' AS rol, COUNT(*) AS total_rut_k
FROM estudiantes e
JOIN personas p ON p.id_persona = e.id_persona
WHERE UPPER(TRIM(p.rut)) LIKE '%K'

UNION ALL

SELECT 'Academico' AS rol, COUNT(*) AS total_rut_k
FROM academicos ac
JOIN personas p ON p.id_persona = ac.id_persona
WHERE UPPER(TRIM(p.rut)) LIKE '%K'

UNION ALL

SELECT 'Administrativo' AS rol, COUNT(*) AS total_rut_k
FROM administrativos ad
JOIN personas p ON p.id_persona = ad.id_persona
WHERE UPPER(TRIM(p.rut)) LIKE '%K';
```

Que se busca lograr: revisar consistencia y distribucion de identificadores institucionales.

---

# Grupo 3: Inteligencia de Negocios y Proyeccion Financiera

Este bloque transforma datos academicos en indicadores economicos simulados. No calcula contabilidad real, sino aproximaciones para apoyar planificacion.

## 1. Simulacion de ingresos por creditos inscritos

Explicacion simple: cada credito inscrito se valoriza en 50.000 pesos. Se suma por carrera segun asignaturas inscritas.

SQL:

```sql
SELECT
    c.nombre AS carrera,
    SUM(a.creditos) AS total_creditos_inscritos,
    SUM(a.creditos) * 50000 AS ingresos_proyectados_clp
FROM inscripciones i
JOIN estudiantes e ON e.id_estudiante = i.id_estudiante
JOIN carreras c ON c.id_carrera = e.id_carrera
JOIN secciones s ON s.id_seccion = i.id_seccion
JOIN asignaturas a ON a.id_asignatura = s.id_asignatura
WHERE i.estado = 'Activa'
GROUP BY c.id_carrera, c.nombre
ORDER BY ingresos_proyectados_clp DESC;
```

Que se busca lograr: estimar facturacion academica usando carga inscrita.

## 2. Costo oportunidad de desercion e inactividad

Explicacion simple: cada estudiante suspendido o eliminado representa una matricula anual no percibida de 4.200.000 pesos.

SQL:

```sql
SELECT
    c.nombre AS carrera,
    COUNT(e.id_estudiante) AS estudiantes_inactivos,
    COUNT(e.id_estudiante) * 4200000 AS costo_oportunidad_clp
FROM estudiantes e
JOIN carreras c ON c.id_carrera = e.id_carrera
WHERE e.estado IN ('Suspendido', 'Eliminado')
GROUP BY c.id_carrera, c.nombre
ORDER BY costo_oportunidad_clp DESC;
```

Que se busca lograr: dimensionar economicamente la perdida asociada a desercion o inactividad.

## 3. Dinamica de atraccion de clientes

Explicacion simple: se compara cuantos estudiantes ingresaron en 2026 contra todos los ingresos anteriores.

SQL:

```sql
SELECT
    CASE
        WHEN anio_ingreso = 2026 THEN 'Ingreso 2026'
        WHEN anio_ingreso < 2026 THEN 'Historico anterior'
        ELSE 'Posterior a 2026'
    END AS periodo_ingreso,
    COUNT(*) AS total_estudiantes,
    ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM estudiantes), 2) AS porcentaje
FROM estudiantes
GROUP BY periodo_ingreso
ORDER BY total_estudiantes DESC;
```

Que se busca lograr: medir captacion reciente respecto de la base historica.

## 4. Ratio de eficiencia de planta docente

Explicacion simple: se calcula cuantos alumnos regulares existen por cada academico de planta en cada facultad.

SQL:

```sql
WITH alumnos_facultad AS (
    SELECT
        f.id_facultad,
        COUNT(e.id_estudiante) AS alumnos_regulares
    FROM facultades f
    JOIN carreras c ON c.id_facultad = f.id_facultad
    JOIN estudiantes e ON e.id_carrera = c.id_carrera
    WHERE e.estado = 'Regular'
    GROUP BY f.id_facultad
),
planta_facultad AS (
    SELECT
        f.id_facultad,
        COUNT(ac.id_academico) AS academicos_planta
    FROM facultades f
    JOIN departamentos dep ON dep.id_facultad = f.id_facultad
    JOIN academicos ac ON ac.id_departamento = dep.id_departamento
    WHERE ac.tipo_contrato = 'Planta'
    GROUP BY f.id_facultad
)
SELECT
    f.nombre AS facultad,
    COALESCE(a.alumnos_regulares, 0) AS alumnos_regulares,
    COALESCE(p.academicos_planta, 0) AS academicos_planta,
    ROUND(
        1.0 * COALESCE(a.alumnos_regulares, 0)
        / NULLIF(COALESCE(p.academicos_planta, 0), 0),
        2
    ) AS alumnos_por_academico_planta
FROM facultades f
LEFT JOIN alumnos_facultad a ON a.id_facultad = f.id_facultad
LEFT JOIN planta_facultad p ON p.id_facultad = f.id_facultad
ORDER BY alumnos_por_academico_planta DESC;
```

Que se busca lograr: estimar presion operativa sobre docentes de planta.

## 5. Participacion de mercado interno

Explicacion simple: se calcula que porcentaje del total de estudiantes pertenece a cada facultad.

SQL:

```sql
SELECT
    f.nombre AS facultad,
    COUNT(e.id_estudiante) AS total_estudiantes,
    ROUND(100.0 * COUNT(e.id_estudiante) / (SELECT COUNT(*) FROM estudiantes), 2) AS participacion_porcentual
FROM facultades f
JOIN carreras c ON c.id_facultad = f.id_facultad
JOIN estudiantes e ON e.id_carrera = c.id_carrera
GROUP BY f.id_facultad, f.nombre
ORDER BY participacion_porcentual DESC;
```

Que se busca lograr: identificar el peso relativo de cada facultad dentro de la institucion.

## 6. Potencial de conversion a postgrados

Explicacion simple: se listan egresados o titulados con promedio alto, porque podrian ser candidatos a programas avanzados.

SQL:

```sql
SELECT
    p.rut,
    p.nombres || ' ' || p.apellidos AS estudiante,
    p.email,
    c.nombre AS carrera,
    e.estado,
    ROUND(AVG(i.nota_final), 2) AS promedio_acumulado
FROM estudiantes e
JOIN personas p ON p.id_persona = e.id_persona
JOIN carreras c ON c.id_carrera = e.id_carrera
JOIN inscripciones i ON i.id_estudiante = e.id_estudiante
WHERE e.estado IN ('Egresado', 'Titulado')
  AND i.nota_final IS NOT NULL
GROUP BY e.id_estudiante, p.rut, estudiante, p.email, c.nombre, e.estado
HAVING AVG(i.nota_final) >= 5.5
ORDER BY promedio_acumulado DESC;
```

Que se busca lograr: construir una base comercial de titulados con buen rendimiento.

## 7. Eficiencia en uso de recursos didacticos

Explicacion simple: se calcula el promedio de estudiantes inscritos por seccion abierta, agrupado por facultad.

SQL:

```sql
WITH inscritos_seccion AS (
    SELECT
        s.id_seccion,
        f.id_facultad,
        f.nombre AS facultad,
        COUNT(i.id_inscripcion) AS inscritos_reales
    FROM secciones s
    JOIN asignaturas a ON a.id_asignatura = s.id_asignatura
    JOIN mallas_curriculares mc ON mc.id_asignatura = a.id_asignatura
    JOIN carreras c ON c.id_carrera = mc.id_carrera
    JOIN facultades f ON f.id_facultad = c.id_facultad
    LEFT JOIN inscripciones i ON i.id_seccion = s.id_seccion
    GROUP BY s.id_seccion, f.id_facultad, f.nombre
)
SELECT
    facultad,
    ROUND(AVG(inscritos_reales), 2) AS promedio_estudiantes_por_seccion
FROM inscritos_seccion
GROUP BY id_facultad, facultad
ORDER BY promedio_estudiantes_por_seccion DESC;
```

Que se busca lograr: detectar sobrepoblacion o subutilizacion de secciones.

Nota tecnica: si una asignatura pertenece a varias mallas, esta consulta puede duplicar secciones por facultad. En ese caso conviene validar con la base real o asociar la seccion a una carrera cuando exista ese dato.

## 8. Riesgo de perdida de financiamiento

Explicacion simple: se buscan estudiantes que reprobaron mas de la mitad de las asignaturas evaluadas.

SQL:

```sql
SELECT
    e.id_estudiante,
    p.rut,
    p.nombres || ' ' || p.apellidos AS estudiante,
    COUNT(i.id_inscripcion) AS asignaturas_evaluadas,
    SUM(CASE WHEN i.nota_final < 4.0 THEN 1 ELSE 0 END) AS asignaturas_reprobadas,
    ROUND(
        100.0 * SUM(CASE WHEN i.nota_final < 4.0 THEN 1 ELSE 0 END)
        / COUNT(i.id_inscripcion),
        2
    ) AS porcentaje_reprobacion
FROM estudiantes e
JOIN personas p ON p.id_persona = e.id_persona
JOIN inscripciones i ON i.id_estudiante = e.id_estudiante
WHERE i.nota_final IS NOT NULL
GROUP BY e.id_estudiante, p.rut, estudiante
HAVING
    1.0 * SUM(CASE WHEN i.nota_final < 4.0 THEN 1 ELSE 0 END)
    / COUNT(i.id_inscripcion) > 0.5
ORDER BY porcentaje_reprobacion DESC;
```

Que se busca lograr: identificar alumnos en riesgo de perder beneficios o continuidad academica.

## 9. Participacion de programas Magister

Explicacion simple: se cuentan alumnos que cursan carreras cuyo nombre contiene la palabra Magister.

SQL:

```sql
SELECT
    c.nombre AS programa,
    COUNT(e.id_estudiante) AS total_alumnos
FROM carreras c
JOIN estudiantes e ON e.id_carrera = c.id_carrera
WHERE c.nombre LIKE '%Magister%'
GROUP BY c.id_carrera, c.nombre
ORDER BY total_alumnos DESC;
```

Que se busca lograr: medir el volumen de estudiantes en programas de especializacion avanzada.

## 10. Indice proximal de gasto operacional docente

Explicacion simple: se asigna un peso de costo a cada academico segun contrato: planta cuesta 1.5 unidades y honorarios 0.8. Luego se suma por departamento.

SQL:

```sql
SELECT
    dep.nombre AS departamento,
    SUM(
        CASE
            WHEN ac.tipo_contrato = 'Planta' THEN 1.5
            WHEN ac.tipo_contrato = 'Honorarios' THEN 0.8
            ELSE 0
        END
    ) AS indice_costo_operacional
FROM academicos ac
JOIN departamentos dep ON dep.id_departamento = ac.id_departamento
GROUP BY dep.id_departamento, dep.nombre
ORDER BY indice_costo_operacional DESC;
```

Que se busca lograr: comparar carga relativa de costo docente entre departamentos.

---

# Recomendacion para armar el informe final

La estructura mas segura para el informe es:

1. Portada.
2. Resumen ejecutivo.
3. Introduccion y objetivos.
4. Metodologia y origen de datos.
5. Resultados y visualizaciones.
6. Conclusiones y recomendaciones.
7. Anexos con SQL comentado.

Para cada pregunta conviene presentar:

- Una tabla agregada con pocos datos.
- Un grafico si el resultado compara categorias.
- Un parrafo interpretativo que diga que significa el resultado.

Ejemplo de parrafo interpretativo:

"La carrera con mayor promedio historico presenta un mejor desempeno acumulado de sus estudiantes en comparacion con el resto de los programas. Este resultado puede asociarse a una mejor progresion academica, aunque no permite concluir por si solo que la carrera tenga mayor calidad docente, ya que tambien influyen factores como perfil de ingreso, dificultad de asignaturas y criterios de evaluacion."

## Observaciones importantes antes de entregar

- No inventar numeros: las tablas y graficos deben salir de la base SQLite real.
- Revisar si los valores textuales coinciden exactamente con la base: por ejemplo `Regular`, `Planta`, `Honorarios`, `Titulado`, `Magister`.
- El PDF menciona Arial 12 en requisitos, pero la pauta de evaluacion menciona Times New Roman 11. Conviene preguntarle al docente o seguir la pauta mas reciente si fue entregada por el mismo documento.
- En anexos se debe pegar el SQL exacto usado, idealmente con comentarios.
- El limite de 5 paginas aplica al contenido principal, no necesariamente a anexos.

