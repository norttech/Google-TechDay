# Develop an App with Vertex AI Gemini 1.0 Pro

- [Develop an App with Vertex AI Gemini 1.0 Pro](#develop-an-app-with-vertex-ai-gemini-10-pro)
  - [Introducción](#introducción)
  - [Objetivos](#objetivos)
  - [Tarea 1: Configura tu entorno y proyecto](#tarea-1-configura-tu-entorno-y-proyecto)
  
## Introducción

Gemini es una familia de modelos de IA generativa diseñada para casos de uso multimodal. Viene en tres tamaños: Ultra, Pro y Nano. Gemini 1.0 Pro está disponible para desarrolladores y empresas para construir según sus propios casos de uso. Gemini 1.0 Pro acepta texto como entrada y genera texto como salida. También hay un endpoint multimodal dedicado, Gemini 1.0 Pro Vision, que acepta texto e imágenes como entrada y genera texto como salida. Hay SDKs disponibles para ayudarte a desarrollar aplicaciones en Python, Android (Kotlin), Node.js, Swift y JavaScript.

En Google Cloud, la API de Vertex AI Gemini proporciona una interfaz unificada para interactuar con los modelos Gemini. La API admite prompts multimodales como entrada y salida de texto o código. Actualmente, hay dos modelos disponibles en la API de Gemini:

- **Modelo Gemini 1.0 Pro (gemini-pro):** Diseñado para manejar tareas de lenguaje natural, chat de texto y código multiturno, y generación de código.

- **Modelo Gemini 1.0 Pro Vision (gemini-pro-vision):** Soporta prompts multimodales. Puedes incluir texto, imágenes y video en tus solicitudes de prompt y obtener respuestas en forma de texto o código.

Vertex AI es una plataforma de aprendizaje automático (ML) que te permite entrenar y desplegar modelos de ML y aplicaciones de IA, y personalizar modelos de lenguaje grande (LLMs) para usarlos en tus aplicaciones impulsadas por IA. Vertex AI permite la personalización de Gemini con control total de los datos y se beneficia de características adicionales de Google Cloud para la seguridad empresarial, la seguridad, la privacidad y el gobierno y cumplimiento de datos. Para obtener más información sobre Vertex AI, consulta el enlace en la sección de Próximos pasos al final del laboratorio.

En este laboratorio, utilizas el SDK de Vertex AI para Python para llamar a la API de Vertex AI Gemini.

## Objetivos

En este laboratorio, aprenderás a realizar las siguientes tareas:

- Desarrollar una aplicación en Python utilizando el framework Streamlit.
- Instalar el SDK de Vertex AI para Python.
- Desarrollar código para interactuar con el modelo Gemini 1.0 Pro (gemini-pro) utilizando la API de Vertex AI Gemini.
- Desarrollar código para interactuar con el modelo Gemini 1.0 Pro Vision (gemini-pro-vision) utilizando la API de Vertex AI Gemini.
- Contenerizar tu aplicación, desplegarla y probarla en Cloud Run.

## Tarea 1: Configura tu entorno y proyecto

1. Inicia sesión en la consola de Google Cloud con tus credenciales del laboratorio y abre la ventana del terminal de Cloud Shell.
&nbsp;
2. Para establecer las variables de entorno de tu ID de proyecto y región, en Cloud Shell, ejecuta los siguientes comandos:

    ```bash
    PROJECT_ID=$(gcloud config get-value project)
    REGION=us-central1
    echo "PROJECT_ID=${PROJECT_ID}"
    echo "REGION=${REGION}"
    ```

3. Para poder utilizar varios servicios de Google Cloud en este laboratorio, debes habilitar algunas API:
&nbsp;

    ```bash
    gcloud services enable cloudbuild.googleapis.com cloudfunctions.googleapis.com run.googleapis.com logging.googleapis.com storage-component.googleapis.com aiplatform.googleapis.com
    ```
