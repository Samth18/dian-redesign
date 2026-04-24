# Informe de Avances: Rediseño UX y Accesibilidad

**Asignatura:** Diseño de Contenido para Interfaces de Usuario - Universidad del Valle
**Proyecto:** Rediseño del Portal Transaccional de la DIAN

---

## 1. Informe de Avances Técnicos y de Diseño
A la fecha, el proyecto cuenta con una arquitectura base funcional en React centrada en la **Accesibilidad (WCAG AA/AAA)** y el **Diseño de Contenido**:
* **Arquitectura Escalable:** Implementación de rutas dinámicas (Inicio, Mis Trámites, Impuestos, Aduanas) usando React Router.
* **Panel de Accesibilidad Universal:** Desarrollo de un menú persistente que permite cambiar el tamaño del texto (`rem`), alternar a Alto Contraste (AAA), Modo Oscuro, tipografía para dislexia, espaciado de texto y resaltado de enlaces.
* **Componentes Inclusivos:** Formularios con etiquetas semánticas y navegación estructurada (`aria-labels`, roles).

---

## 2. Estrategia de Voz y Tono

Para romper la barrera del "lenguaje técnico punitivo", hemos definido una personalidad institucional que prioriza la colaboración sobre la instrucción.

* **Voz:** Empática, facilitadora y transparente. La DIAN deja de ser un fiscalizador para convertirse en un guía.
* **Tono:** Se ajusta según el estado emocional del usuario. Es educativo al inicio del trámite y resolutivo (nunca culpabilizante) cuando el sistema detecta un error de entrada.

---

## 3. Storytelling: El Viaje del Ciudadano

Hemos diseñado la interacción como un arco narrativo que transforma la ansiedad en confianza:

* **La Necesidad:** El usuario llega con la urgencia de cumplir una obligación legal.
* **El Encuentro:** Se enfrenta a una interfaz limpia que utiliza lenguaje ciudadano en lugar de códigos internos.
* **La Acción:** El proceso se divide en pasos lógicos (bocados de información), reduciendo la carga cognitiva.
* **El Cierre:** Confirmación de éxito con un mensaje que refuerza el valor del ciudadano para el país.

---

## 4. Transformación de Microcopy (Borradores Críticos)

A continuación, se presentan ejemplos de cómo el contenido está dando forma a la nueva interfaz, eliminando la jerga innecesaria:

| Flujo | Antes (Tradicional) | Después (Propuesto) | Justificación UX |
| :--- | :--- | :--- | :--- |
| **Validación** | Campo inválido | Verifica este número: debe tener 10 dígitos. | Guía directa al objetivo. |
| **Errores** | Error 500 / Error de sistema | Algo salió mal. Por favor, intenta de nuevo en unos minutos. | Mensaje humanizado y calmante. |
| **Acción** | Procesar | Enviar declaración | Verbo de acción específico. |
| **Sesión** | Credenciales inválidas | Usuario o contraseña incorrectos. ¿Olvidaste tu clave? | Ofrece una solución inmediata. |