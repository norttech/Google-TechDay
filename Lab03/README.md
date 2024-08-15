# Develop an App with Vertex AI Gemini 1.0 Pro

- [Develop an App with Vertex AI Gemini 1.0 Pro](#develop-an-app-with-vertex-ai-gemini-10-pro)
  - [Introducción](#introducción)
  - [Objetivos](#objetivos)
  - [Configura tu entorno local](#configura-tu-entorno-local)
  - [Tarea 1: Configura tu entorno y proyecto](#tarea-1-configura-tu-entorno-y-proyecto)
  - [Tarea 2: Configura el entorno de la aplicación](#tarea-2-configura-el-entorno-de-la-aplicación)
    - [Confirma que Cloud Shell está autorizado](#confirma-que-cloud-shell-está-autorizado)
    - [Crea el directorio de la aplicación](#crea-el-directorio-de-la-aplicación)
    - [Configura un entorno virtual de Python](#configura-un-entorno-virtual-de-python)
    - [Instala las dependencias de la aplicación](#instala-las-dependencias-de-la-aplicación)
  - [Tarea 3. Desarrolla la aplicación](#tarea-3-desarrolla-la-aplicación)
    - [Escribe el punto de entrada principal de la aplicación](#escribe-el-punto-de-entrada-principal-de-la-aplicación)
    - [Desarrolla la pestaña 1 - Story](#desarrolla-la-pestaña-1---story)
    - [Desarrolla response\_utils](#desarrolla-response_utils)
  - [Tarea 4. Ejecuta y prueba la aplicación localmente](#tarea-4-ejecuta-y-prueba-la-aplicación-localmente)
    - [Ejecuta la Aplicación](#ejecuta-la-aplicación)
    - [Prueba la aplicación - Story tab](#prueba-la-aplicación---story-tab)
  - [Tarea 5. Genera una campaña de marketing](#tarea-5-genera-una-campaña-de-marketing)
    - [Desarrolla la pestaña 2 - Marketing Campaign](#desarrolla-la-pestaña-2---marketing-campaign)
    - [Modifica el punto de entrada principal de la aplicación](#modifica-el-punto-de-entrada-principal-de-la-aplicación)
    - [Prueba la aplicación - Marketing Campaign tab](#prueba-la-aplicación---marketing-campaign-tab)
  - [Tarea 6. Generar el image playground](#tarea-6-generar-el-image-playground)
    - [Desarrollar la pestaña 3 - Image Playground](#desarrollar-la-pestaña-3---image-playground)
    - [Actualizar response\_utils](#actualizar-response_utils)
    - [Modifica el punto de entrada principal de la aplicación (pestaña 3)](#modifica-el-punto-de-entrada-principal-de-la-aplicación-pestaña-3)
    - [Prueba la aplicación - Image Playground tab](#prueba-la-aplicación---image-playground-tab)
  - [Tarea 7. Analizar el diseño de la imagen](#tarea-7-analizar-el-diseño-de-la-imagen)
    - [Actualizar la pestaña Image Playground - Oven instructions](#actualizar-la-pestaña-image-playground---oven-instructions)
    - [Prueba la aplicación - Image Playground - Oven instructions tab](#prueba-la-aplicación---image-playground---oven-instructions-tab)
  - [Tarea 8. Analizar diagramas ER](#tarea-8-analizar-diagramas-er)
    - [Actualizar la pestaña Image Playground - Diagramas ER](#actualizar-la-pestaña-image-playground---diagramas-er)
    - [Prueba la aplicación - Image Playground - ER diagramas tab](#prueba-la-aplicación---image-playground---er-diagramas-tab)
  - [Tarea 9. Razonamiento matemático](#tarea-9-razonamiento-matemático)
    - [Actualizar la pestaña Image Playground - Math reasoning](#actualizar-la-pestaña-image-playground---math-reasoning)
    - [Prueba la aplicación - Image Playground - Math reasoning tab](#prueba-la-aplicación---image-playground---math-reasoning-tab)
  - [Tarea 10. Generar el video playground](#tarea-10-generar-el-video-playground)
    - [Desarrollar la pestaña 4 - Video Playground](#desarrollar-la-pestaña-4---video-playground)
    - [Modifica el punto de entrada principal de la aplicación (pestaña 4)](#modifica-el-punto-de-entrada-principal-de-la-aplicación-pestaña-4)
    - [Prueba la aplicación - Video Playground tab](#prueba-la-aplicación---video-playground-tab)
  - [Tarea 11. Generar etiquetas de video](#tarea-11-generar-etiquetas-de-video)
    - [Actualizar la pestaña Image Playground - Video tags](#actualizar-la-pestaña-image-playground---video-tags)
    - [Prueba la aplicación - Video Playground - Video tags tab](#prueba-la-aplicación---video-playground---video-tags-tab)
  - [Tarea 12. Generar destacados del video](#tarea-12-generar-destacados-del-video)
    - [Actualizar la pestaña Image Playground - Video highlights](#actualizar-la-pestaña-image-playground---video-highlights)
    - [Prueba la aplicación - Video Playground - Video highlights tab](#prueba-la-aplicación---video-playground---video-highlights-tab)
  - [Tarea 13. Generar ubicación del video](#tarea-13-generar-ubicación-del-video)
    - [Actualizar la pestaña Image Playground - Video geolocation](#actualizar-la-pestaña-image-playground---video-geolocation)
    - [Prueba la aplicación - Video Playground - Video geolocation tab](#prueba-la-aplicación---video-playground---video-geolocation-tab)
  - [Tarea 14. Desplegar la aplicación en Cloud Run](#tarea-14-desplegar-la-aplicación-en-cloud-run)
    - [Configurar el entorno para desplegar](#configurar-el-entorno-para-desplegar)
    - [Crear el repositorio de Docker](#crear-el-repositorio-de-docker)
    - [Construir la imagen del contenedor](#construir-la-imagen-del-contenedor)
    - [Desplegar y probar tu aplicación en Cloud Run](#desplegar-y-probar-tu-aplicación-en-cloud-run)
  - [¡Felicidades! Haz terminado el laboratorio](#felicidades-haz-terminado-el-laboratorio)
  
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

## Configura tu entorno local

Antes de comenzar con el laboratorio, es necesario que configures tu entorno local con el SDK proporcionado por Google Cloud.

1. Dirigite al siguiente enlace <https://cloud.google.com/sdk?hl=es-419> para descargar el SDK de Google Cloud.

2. Haz clic en el botón "Instala Google Cloud CLI"

    ![alt text](<img/1.png>)

3. Sigue los pasos de instalación según tu sistema operativo:

    ![alt text](<img/2.png>)

4. Una vez hayas descargado e instalado el SDK de Google Cloud en tu computadora, abre tu terminal y ejecuta el siguiente comando:

    ```bash
    gcloud init
    ```

    Si se te solicita autenticarte, asegúrate de tener la sesión activa en tu navegador de tu cuenta de Google Console.

    > Puedes iniciar sesión en tu cuenta de Google Console a través del siguiente enlace <https://console.cloud.google.com/?hl=es>

5. Al ejecutar el comando, se te pedirá que elijas la configuración deseada (configuración por defecto o crear nueva configuración). Para este laboratorio, selecciona la opción 2: "Crear nueva configuración".

    ![alt text](<img/3.png>)

6. Al ingresar la opción correspondiente, deberás añadir un nombre para esa configuración (elige un nombre de tu preferencia).

    ![alt text](<img/4.png>)

7. Luego, selecciona tu cuenta donde iniciaste sesión en Google Console.

    ![alt text](<img/5.png>)

8. Por último, selecciona el proyecto en el que trabajarás para desarrollar el laboratorio.

    ![alt text](<img/6.png>)

9. Al terminar la configuración, se debería de obtener un resultado como el siguiente:

    ![alt text](<img/7.png>)

> Antes de continuar, crea una carpeta en tu escritorio con un nombre de tu elección; ahí es donde trabajarás las tareas del laboratorio

## Tarea 1: Configura tu entorno y proyecto

1. Abre la terminal de tu computadora y navega hasta la carpeta que creaste anteriormente.

    Como se trabajará de forma local, la terminal se denominará Cloud Shell. Cloud Shell, por su parte, es la terminal integrada que proporciona Google Console en su interfaz.

2. Para establecer las variables de entorno de tu ID de proyecto y región, en Cloud Shell, ejecuta los siguientes comandos:

    ```bash
    PROJECT_ID=$(gcloud config get-value project)
    REGION=us-central1
    echo "PROJECT_ID=${PROJECT_ID}"
    echo "REGION=${REGION}"
    ```

3. Para poder utilizar varios servicios de Google Cloud en este laboratorio, debes habilitar algunas API:

    ```bash
    gcloud services enable cloudbuild.googleapis.com cloudfunctions.googleapis.com run.googleapis.com logging.googleapis.com storage-component.googleapis.com aiplatform.googleapis.com
    ```

## Tarea 2: Configura el entorno de la aplicación

En esta tarea, configurarás un entorno virtual de Python e instalarás las dependencias de la aplicación.

### Confirma que Cloud Shell está autorizado

1. Para confirmar que Cloud Shell está autorizado, en Cloud Shell, ejecuta el siguiente comando:

    ```bash
    gcloud auth list
    ```

2. Si se te solicita autorizar Cloud Shell, haz clic en **Autorizar**

### Crea el directorio de la aplicación

1. Para crear el directorio de la aplicación, ejecuta el siguiente comando:

    ```bash
    mkdir ~/gemini-app
    ```

2. Cambia al directorio `~/gemini-app` con el siguiente comando:

    ```bash
    cd ~/gemini-app
    ```

Los archivos de la aplicación se crean en el directorio ~/gemini-app. Este directorio contendrá los archivos fuente de la aplicación en Python, las dependencias y un archivo Docker que utilizaremos más adelante en este laboratorio.

### Configura un entorno virtual de Python

Crea un entorno virtual sobre la instalación existente de Python, de modo que cualquier paquete instalado en este entorno esté aislado de los paquetes en el entorno base. Cuando se usa desde un entorno virtual, herramientas de instalación como `pip` instalarán paquetes de Python en el entorno virtual.

1. Para crear el entorno virtual de Python, dentro de la carpeta gemini-app, ejecuta el siguiente comando:

    ```bash
    python3 -m venv gemini-streamlit
    ```

    > El módulo venv crea un entorno virtual ligero, con su propio conjunto independiente de paquetes de Python.

2. Para activar el entorno virtual de Python, ejecuta:

    ```bash
    source gemini-streamlit/bin/activate
    ```

### Instala las dependencias de la aplicación

Un archivo de requisitos de Python es un archivo de texto simple que enumera las dependencias requeridas por tu proyecto. Para comenzar, necesitamos tres módulos en nuestro archivo de requisitos.

Nuestra aplicación está escrita usando Streamlit, una biblioteca de Python de código abierto utilizada para crear aplicaciones web para aprendizaje automático y ciencia de datos. La aplicación utiliza la biblioteca Vertex AI SDK para Python para interactuar con la API y los modelos de Gemini. Cloud Logging se usa para registrar información desde nuestra aplicación.

1. Para crear el archivo de requisitos, ejecuta el siguiente comando:

    ```bash
    cat > ~/gemini-app/requirements.txt <<EOF
    streamlit
    google-cloud-aiplatform==1.38.1
    google-cloud-logging==3.6.0

    EOF
    ```

2. Instala las dependencias de la aplicación:

    ```bash
    pip install -r requirements.txt
    ```

    `pip` es el instalador de paquetes para Python.

    Espera hasta que se instalen todos los paquetes antes de continuar con la siguiente tarea.

## Tarea 3. Desarrolla la aplicación

El código fuente de la aplicación se escribirá en varios archivos `.py`. Comencemos con el punto de entrada principal en `app.py`.

### Escribe el punto de entrada principal de la aplicación

1. Para crear el código del punto de entrada de `app.py`, ejecuta el siguiente comando:

    ```bash
    cat > ~/gemini-app/app.py <<EOF
    import os
    import streamlit as st
    from app_tab1 import render_story_tab
    from vertexai.preview.generative_models import GenerativeModel
    import vertexai
    import logging
    from google.cloud import logging as cloud_logging

    # configure logging
    logging.basicConfig(level=logging.INFO)
    # attach a Cloud Logging handler to the root logger
    log_client = cloud_logging.Client()
    log_client.setup_logging()

    PROJECT_ID = os.environ.get('PROJECT_ID')   # Your Qwiklabs Google Cloud Project ID
    LOCATION = os.environ.get('REGION')         # Your Qwiklabs Google Cloud Project Region
    vertexai.init(project=PROJECT_ID, location=LOCATION)

    @st.cache_resource
    def load_models():
        text_model_pro = GenerativeModel("gemini-pro")
        multimodal_model_pro = GenerativeModel("gemini-pro-vision")
        return text_model_pro, multimodal_model_pro

    st.header("Vertex AI Gemini API", divider="rainbow")
    text_model_pro, multimodal_model_pro = load_models()

    tab1, tab2, tab3, tab4 = st.tabs(["Story", "Marketing Campaign", "Image Playground", "Video Playground"])

    with tab1:
        render_story_tab(text_model_pro)

    EOF
    ```

2. Para ver el contenido del archivo app.py, ejecuta el siguiente comando:

    ```bash
    cat ~/gemini-app/app.py
    ```

La aplicación utiliza `Streamlit` para crear una serie de pestañas en la interfaz de usuario. En esta versión inicial de la aplicación, se construye la primera pestaña llamada **Story** que contiene la funcionalidad para generar una historia. Posteriormente, se construirán las otras pestañas en tareas sucesivas del laboratorio.

La aplicación primero inicializa el `Vertex AI SDK` pasando los valores de las variables de entorno PROJECT_ID y REGION.

Luego, carga los modelos `gemini-pro` y `gemini-pro-vision` usando la clase `GenerativeModel`, que representa un modelo de Gemini. Esta clase incluye métodos para ayudar a generar contenido a partir de texto, imágenes y video.

La aplicación crea 4 pestañas en la interfaz de usuario denominadas Story, Marketing Campaign, Image Playground y Video Playground.

El código de la aplicación luego invoca la función `render_tab1()` para crear la interfaz de usuario para la pestaña "Story" en la interfaz de la aplicación.

### Desarrolla la pestaña 1 - Story

1. Para escribir el código que renderiza la pestaña "Story" en la interfaz de la aplicación, ejecuta el siguiente comando:

    ```bash
    cat > ~/gemini-app/app_tab1.py <<EOF
    import streamlit as st
    from vertexai.preview.generative_models import GenerativeModel
    from response_utils import *
    import logging

    # create the model prompt based on user input.
    def generate_prompt():
        # Story character input
        character_name = st.text_input("Enter character name: \n\n",key="character_name",value="Mittens")
        character_type = st.text_input("What type of character is it? \n\n",key="character_type",value="Cat")
        character_persona = st.text_input("What personality does the character have? \n\n",
                                        key="character_persona",value="Mitten is a very friendly cat.")
        character_location = st.text_input("Where does the character live? \n\n",key="character_location",value="Andromeda Galaxy")

        # Story length and premise
        length_of_story = st.radio("Select the length of the story: \n\n",["Short","Long"],key="length_of_story",horizontal=True)
        story_premise = st.multiselect("What is the story premise? (can select multiple) \n\n",["Love","Adventure","Mystery","Horror","Comedy","Sci-Fi","Fantasy","Thriller"],key="story_premise",default=["Love","Adventure"])
        creative_control = st.radio("Select the creativity level: \n\n",["Low","High"],key="creative_control",horizontal=True)
        if creative_control == "Low":
            temperature = 0.30
        else:
            temperature = 0.95

        prompt = f"""Write a {length_of_story} story based on the following premise: \n
        character_name: {character_name} \n
        character_type: {character_type} \n
        character_persona: {character_persona} \n
        character_location: {character_location} \n
        story_premise: {",".join(story_premise)} \n
        If the story is "short", then make sure to have 5 chapters or else if it is "long" then 10 chapters. 
        Important point is that each chapter should be generated based on the premise given above.
        First start by giving the book introduction, chapter introductions and then each chapter. It should also have a proper ending.
        The book should have a prologue and an epilogue.
        """

        return temperature, prompt

    # function to render the story tab, and call the model, and display the model prompt and response.
    def render_story_tab (text_model_pro: GenerativeModel):
        st.write("Using Gemini 1.0 Pro - Text only model")
        st.subheader("Generate a story")

        temperature, prompt = generate_prompt()

        config = {
            "temperature": temperature,
            "max_output_tokens": 2048,
            }

        generate_t2t = st.button("Generate my story", key="generate_t2t")
        if generate_t2t and prompt:
            # st.write(prompt)
            with st.spinner("Generating your story using Gemini..."):
                first_tab1, first_tab2 = st.tabs(["Story response", "Prompt"])
                with first_tab1: 
                    response = get_gemini_pro_text_response(text_model_pro, prompt, generation_config=config)
                    if response:
                        st.write("Your story:")
                        st.write(response)
                        logging.info(response)
                with first_tab2: 
                    st.text(prompt)

    EOF
    ```

2. Para ver el contenido del archivo `app_tab1.py`, ejecuta el siguiente comando:

    ```bash
    cat ~/gemini-app/app_tab1.py
    ```

La función `render_story_tab` genera los controles de la interfaz en la pestaña mediante la invocación de funciones para renderizar los campos de texto y otras opciones.

La función `generate_prompt` genera el prompt de texto que se suministra a la API de Gemini. La cadena del prompt se crea concatenando los valores ingresados por el usuario en la interfaz de la pestaña para el personaje de la historia, y opciones como la longitud de la historia (corta, larga), nivel de creatividad (bajo, alto) y la premisa de la historia.

La función también devuelve un valor de `temperatura` basado en el nivel de creatividad seleccionado para la historia. Este valor se suministra como el parámetro de configuración de `temperatura` al modelo, que controla la aleatoriedad de las predicciones del modelo. El parámetro de configuración max_output_tokens especifica el número máximo de tokens de salida a generar por mensaje.

Para generar la respuesta del modelo, se crea un botón en la interfaz de la pestaña. Cuando se hace clic en el botón, se invoca la función `get_gemini_pro_text_response`, que codificaremos en el siguiente paso del laboratorio.

### Desarrolla response_utils

El archivo `response_utils.py` contiene funciones para generar las respuestas del modelo.

1. Para escribir el código que genera la respuesta de texto del modelo, ejecuta el siguiente comando:

    ```bash
    cat > ~/gemini-app/response_utils.py <<EOF

    from vertexai.preview.generative_models import (Content,
                                                GenerationConfig,
                                                GenerativeModel,
                                                GenerationResponse,
                                                Image,
                                                HarmCategory, 
                                                HarmBlockThreshold,
                                                Part)

    def get_gemini_pro_text_response( model: GenerativeModel,
                                    prompt: str, 
                                    generation_config: GenerationConfig,
                                    stream=True):

        safety_settings={
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
        }

        responses = model.generate_content(prompt,
                                    generation_config = generation_config,
                                    safety_settings = safety_settings,
                                    stream=True)

        final_response = []
        for response in responses:
            try:
                final_response.append(response.text)
            except IndexError:
                final_response.append("")
                continue
        return " ".join(final_response)

    EOF
    ```

2. Para ver el contenido del archivo `response_utils.py`, ejecuta el siguiente comando

    ```bash
    cat ~/gemini-app/response_utils.py
    ```

La función `get_gemini_pro_text_response` utiliza la clase `GenerativeModel` y algunas de las otras clases del paquete `vertexai.preview.generative_models` en el SDK de Vertex AI para Python. Desde el método `generate_content` de la clase, se genera una respuesta utilizando el prompt de texto que se pasa al método.

También se pasa un objeto `safety_settings` a este método para controlar la respuesta del modelo bloqueando contenido inseguro. El código de ejemplo en este laboratorio utiliza valores de configuración de seguridad que instruyen al modelo para que siempre devuelva contenido, independientemente de la probabilidad de que el contenido sea inseguro. Puedes evaluar el contenido generado y luego ajustar estas configuraciones si tu aplicación requiere una configuración más restrictiva. Para obtener más información, consulta la documentación de [configuración de seguridad](https://ai.google.dev/gemini-api/docs/safety-settings?hl=es-419).

## Tarea 4. Ejecuta y prueba la aplicación localmente

En esta tarea, ejecutarás la aplicación localmente usando Streamlit y probarás la funcionalidad de la aplicación.

### Ejecuta la Aplicación

1. Para ejecutar la aplicación localmente, en Cloud Shell, ejecuta el siguiente comando:

    ```bash
    streamlit run app.py \
    --browser.serverAddress=localhost \
    --server.enableCORS=false \
    --server.enableXsrfProtection=false \
    --server.port 8080
    ```

    La aplicación se inicia y se te proporciona una URL para acceder a la aplicación.

2. Para abrir la página de inicio de la aplicación en tu navegador, haz clic en Vista previa web en la barra de menú de Cloud Shell, y luego haz clic en Vista previa en el puerto 8080.

    ![alt text](img/8.png)

    También puedes copiar y pegar la URL de la aplicación en una pestaña de navegador separada para acceder a la aplicación.

### Prueba la aplicación - Story tab

Genera una historia proporcionando tu entrada, visualiza el prompt y la respuesta generada por el modelo Gemini 1.0 Pro.

1. Para generar una historia, en la pestaña **Story**, deja los ajustes predeterminados y luego haz clic en **Generate my story**.

2. Espera a que se genere la respuesta y luego haz clic en la pestaña **Story response**.

3. Para ver el prompt que se utilizó para generar la respuesta, haz clic en la pestaña **Prompt**.

4. En la ventana de Cloud Shell, termina la aplicación y regresa al símbolo del sistema presionando `CTRL + c`.

## Tarea 5. Genera una campaña de marketing

En esta tarea, utilizarás el modelo de texto Gemini 1.0 Pro para generar una campaña de marketing para una empresa. Desarrollarás el código que genera una segunda pestaña en tu aplicación.

### Desarrolla la pestaña 2 - Marketing Campaign

1. Para escribir el código que renderiza la pestaña **Marketing Campaign** en la interfaz de la aplicación, ejecuta el siguiente comando:

    ```bash
    cat > ~/gemini-app/app_tab2.py <<EOF
    import streamlit as st
    from vertexai.preview.generative_models import GenerativeModel
    from response_utils import *
    import logging

    # create the model prompt based on user input.
    def generate_prompt():
        st.write("Using Gemini 1.0 Pro - Text only model")
        st.subheader("Generate your marketing campaign")

        product_name = st.text_input("What is the name of the product? \n\n",key="product_name",value="ZomZoo")
        product_category = st.radio("Select your product category: \n\n",["Clothing","Electronics","Food","Health & Beauty","Home & Garden"],key="product_category",horizontal=True)

        st.write("Select your target audience: ")
        target_audience_age = st.radio("Target age: \n\n",["18-24","25-34","35-44","45-54","55-64","65+"],key="target_audience_age",horizontal=True)
        # target_audience_gender = st.radio("Target gender: \n\n",["male","female","trans","non-binary","others"],key="target_audience_gender",horizontal=True)
        target_audience_location = st.radio("Target location: \n\n",["Urban", "Suburban","Rural"],key="target_audience_location",horizontal=True)

        st.write("Select your marketing campaign goal: ")
        campaign_goal = st.multiselect("Select your marketing campaign goal: \n\n",["Increase brand awareness","Generate leads","Drive sales","Improve brand sentiment"],key="campaign_goal",default=["Increase brand awareness","Generate leads"])
        if campaign_goal is None:
            campaign_goal = ["Increase brand awareness","Generate leads"]
        brand_voice = st.radio("Select your brand voice: \n\n",["Formal","Informal","Serious","Humorous"],key="brand_voice",horizontal=True)
        estimated_budget = st.radio("Select your estimated budget ($): \n\n",["1,000-5,000","5,000-10,000","10,000-20,000","20,000+"],key="estimated_budget",horizontal=True)

        prompt = f"""Generate a marketing campaign for {product_name}, a {product_category} designed for the age group: {target_audience_age}. 
        The target location is this: {target_audience_location}.
        Aim to primarily achieve {campaign_goal}. 
        Emphasize the product's unique selling proposition while using a {brand_voice} tone of voice. 
        Allocate the total budget of {estimated_budget}.  
        With these inputs, make sure to follow following guidelines and generate the marketing campaign with proper headlines: \n
        - Briefly describe the company, its values, mission, and target audience.
        - Highlight any relevant brand guidelines or messaging frameworks.
        - Provide a concise overview of the campaign's objectives and goals.
        - Briefly explain the product or service being promoted.
        - Define your ideal customer with clear demographics, psychographics, and behavioral insights.
        - Understand their needs, wants, motivations, and pain points.
        - Clearly articulate the desired outcomes for the campaign.
        - Use SMART goals (Specific, Measurable, Achievable, Relevant, and Time-bound) for clarity.
        - Define key performance indicators (KPIs) to track progress and success.
        - Specify the primary and secondary goals of the campaign.
        - Examples include brand awareness, lead generation, sales growth, or website traffic.
        - Clearly define what differentiates your product or service from competitors.
        - Emphasize the value proposition and unique benefits offered to the target audience.
        - Define the desired tone and personality of the campaign messaging.
        - Identify the specific channels you will use to reach your target audience.
        - Clearly state the desired action you want the audience to take.
        - Make it specific, compelling, and easy to understand.
        - Identify and analyze your key competitors in the market.
        - Understand their strengths and weaknesses, target audience, and marketing strategies.
        - Develop a differentiation strategy to stand out from the competition.
        - Define how you will track the success of the campaign.
        - Use relevant KPIs to measure performance and return on investment (ROI).
        Provide bullet points and headlines for the marketing campaign. Do not produce any empty lines. Be very succinct and to the point.
        """

        return prompt

    # function to render the story tab, and call the model, and display the model prompt and response.
    def render_mktg_campaign_tab (text_model_pro: GenerativeModel):
        st.write("Using Gemini 1.0 Pro - Text only model")
        st.subheader("Generate a marketing campaign")

        prompt = generate_prompt()

        config = {
            "temperature": 0.8,
            "max_output_tokens": 2048,
            }

        generate_t2m = st.button("Generate campaign", key="generate_t2m")
        if generate_t2m and prompt:
            # st.write(prompt)
            with st.spinner("Generating a marketing campaign using Gemini..."):
                first_tab1, first_tab2 = st.tabs(["Campaign response", "Prompt"])
                with first_tab1: 
                    response = get_gemini_pro_text_response(text_model_pro, prompt, generation_config=config)
                    if response:
                        st.write("Marketing campaign:")
                        st.write(response)
                        logging.info(response)
                with first_tab2: 
                    st.text(prompt)

    EOF
    ```

### Modifica el punto de entrada principal de la aplicación

- Para agregar la **pestaña 2** a la aplicación, ejecuta el siguiente comando:

    ```bash
    cat >> ~/gemini-app/app.py <<EOF

    from app_tab2 import render_mktg_campaign_tab

    with tab2:
        render_mktg_campaign_tab(text_model_pro)

    EOF
    ```

### Prueba la aplicación - Marketing Campaign tab

Genera una campaña de marketing proporcionando tu entrada, visualiza el prompt y la respuesta generada por el modelo Gemini 1.0 Pro.

1. Para ejecutar la aplicación localmente, en Cloud Shell, ejecuta el siguiente comando:

    ````bash
    streamlit run app.py \
    --browser.serverAddress=localhost \
    --server.enableCORS=false \
    --server.enableXsrfProtection=false \
    --server.port 8080
    ```

    La aplicación se inicia y se te proporciona una URL para acceder a la aplicación.

2. Para abrir la página de inicio de la aplicación en tu navegador, haz clic en **Vista previa web** en la barra de menú de Cloud Shell y luego en **Vista previa en el puerto 8080**.

3. Para generar una campaña de marketing, en la pestaña **Marketing campaign**, deja los ajustes predeterminados y luego haz clic en **Generate campaign**.

4. Espera a que se genere la respuesta y luego haz clic en la pestaña **Campaign response**.

5. Para ver el prompt que se utilizó para generar la respuesta, haz clic en la pestaña **Prompt**.

6. Repite los pasos anteriores para generar campañas de marketing con diferentes valores de los parámetros, como la categoría del producto, el público objetivo, la ubicación y los objetivos de la campaña.

7. En la ventana de Cloud Shell, termina la aplicación y regresa al símbolo del sistema presionando `CTRL + C`.

## Tarea 6. Generar el image playground

En esta tarea, usarás el modelo Gemini 1.0 Pro Vision para procesar imágenes y recibir recomendaciones e información a partir de las imágenes que se suministren al modelo.

### Desarrollar la pestaña 3 - Image Playground

En esta subtarea, implementarás el código para la pestaña **Image Playground** y el código para interactuar con el modelo y generar recomendaciones a partir de una imagen.

1. Para escribir el código que renderiza la pestaña **Image Playground** en la interfaz de la aplicación, ejecuta el siguiente comando:

    ```bash
    cat > ~/gemini-app/app_tab3.py <<EOF
    import streamlit as st
    from vertexai.preview.generative_models import GenerativeModel, Part
    from response_utils import *
    import logging

    # render the Image Playground tab with multiple child tabs
    def render_image_playground_tab(multimodal_model_pro: GenerativeModel):

        st.write("Using Gemini 1.0 Pro Vision - Multimodal model")
        recommendations, screens, diagrams, equations = st.tabs(["Furniture recommendation", "Oven instructions", "ER diagrams", "Math reasoning"])

        with recommendations:
            room_image_uri = "gs://cloud-training/OCBL447/gemini-app/images/living_room.jpeg"
            chair_1_image_uri = "gs://cloud-training/OCBL447/gemini-app/images/chair1.jpeg"
            chair_2_image_uri = "gs://cloud-training/OCBL447/gemini-app/images/chair2.jpeg"
            chair_3_image_uri = "gs://cloud-training/OCBL447/gemini-app/images/chair3.jpeg"
            chair_4_image_uri = "gs://cloud-training/OCBL447/gemini-app/images/chair4.jpeg"

            room_image_url = "https://storage.googleapis.com/"+room_image_uri.split("gs://")[1]
            chair_1_image_url = "https://storage.googleapis.com/"+chair_1_image_uri.split("gs://")[1]
            chair_2_image_url = "https://storage.googleapis.com/"+chair_2_image_uri.split("gs://")[1]
            chair_3_image_url = "https://storage.googleapis.com/"+chair_3_image_uri.split("gs://")[1]
            chair_4_image_url = "https://storage.googleapis.com/"+chair_4_image_uri.split("gs://")[1]        

            room_image = Part.from_uri(room_image_uri, mime_type="image/jpeg")
            chair_1_image = Part.from_uri(chair_1_image_uri,mime_type="image/jpeg")
            chair_2_image = Part.from_uri(chair_2_image_uri,mime_type="image/jpeg")
            chair_3_image = Part.from_uri(chair_3_image_uri,mime_type="image/jpeg")
            chair_4_image = Part.from_uri(chair_4_image_uri,mime_type="image/jpeg")

            st.image(room_image_url,width=350, caption="Image of a living room")
            st.image([chair_1_image_url,chair_2_image_url,chair_3_image_url,chair_4_image_url],width=200, caption=["Chair 1","Chair 2","Chair 3","Chair 4"])

            st.write("Our expectation: Recommend a chair that would complement the given image of a living room.")
            prompt_list = ["Consider the following chairs:",
                        "chair 1:", chair_1_image,
                        "chair 2:", chair_2_image,
                        "chair 3:", chair_3_image, "and",
                        "chair 4:", chair_4_image, "\n"
                        "For each chair, explain why it would be suitable or not suitable for the following room:",
                        room_image,
                        "Only recommend for the room provided and not other rooms. Provide your recommendation in a table format with chair name and reason as columns.",
                ]

            tab1, tab2 = st.tabs(["Response", "Prompt"])
            generate_image_description = st.button("Generate recommendation", key="generate_image_description")
            with tab1:
                if generate_image_description and prompt_list: 
                    with st.spinner("Generating recommendation using Gemini..."):
                        response = get_gemini_pro_vision_response(multimodal_model_pro, prompt_list)
                        st.markdown(response)
                        logging.info(response)
            with tab2:
                st.write("Prompt used:")
                st.text(prompt_list)
    EOF
    ```

2. Para ver el contenido del archivo `app_tab3.py`, ejecuta el siguiente comando:

    ```bash
    cat ~/gemini-app/app_tab3.py
    ```

La función `render_image_playground_tab` construye la interfaz de usuario (UI) que permite al usuario de la aplicación interactuar con el modelo Gemini 1.0 Pro Vision. Crea un conjunto de pestañas: "Furniture recommendation", "Oven instructions", "ER diagrams", "Math reasoning" en la UI. Escribirás el código para las pestañas restantes en tareas posteriores de este laboratorio.

En la pestaña de `Furniture recommendation`, se utiliza una escena de sala de estar para realizar un análisis visual. Junto con un conjunto de imágenes adicionales de sillas, el código invoca el punto de acceso multimodal de la API Gemini 1.0 Pro Vision para obtener una recomendación de una silla que complemente la escena de la sala de estar.

![alt text](img/9.png)

El código utiliza más de un texto de entrada junto con las imágenes de la sala de estar y las sillas, y proporciona todo eso en una lista para el modelo. La clase `Part` se utiliza para obtener la imagen desde la URI de contenido multi-part que se aloja en un bucket de Cloud Storage. El prompt también especifica un formato tabular para la salida del modelo, e incluye la justificación para la recomendación.

### Actualizar response_utils

El archivo `response_utils.py` contiene funciones para generar las respuestas del modelo.

- Actualiza el archivo para agregar código que genere la respuesta multimodal del modelo.

    ```bash
    cat >> ~/gemini-app/response_utils.py <<EOF

    def get_gemini_pro_vision_response(model: GenerativeModel, prompt_list, generation_config={}, stream=True):

        generation_config = {'temperature': 0.1,
                        'max_output_tokens': 2048
                        }

        responses = model.generate_content(prompt_list, generation_config = generation_config, stream=True)

        final_response = []
        for response in responses:
            try:
                final_response.append(response.text)
            except IndexError: 
                final_response.append("")
                continue
        return(" ".join(final_response))

    EOF
    ```

### Modifica el punto de entrada principal de la aplicación (pestaña 3)

- Para agregar la **pestaña 3** a la aplicación, ejecuta el siguiente comando:

    ```bash
    cat >> ~/gemini-app/app.py <<EOF

    from app_tab3 import render_image_playground_tab

    with tab3:
        render_image_playground_tab(multimodal_model_pro)

    EOF
    ```

### Prueba la aplicación - Image Playground tab

1. Ejecuta la aplicación usando el comando proporcionado en pasos anteriores del laboratorio.

2. Para lanzar la página principal de la aplicación en tu navegador, haz clic en **Vista previa web** en la barra de menú de Cloud Shell y luego selecciona **Vista previa en el puerto 8080**.

3. Haz clic en Image Playground y luego en Furniture recommendation.

    La pestaña muestra las imágenes de la sala de estar y de las sillas.

4. Haz clic en **Generate recommendation**

    > Si recibes este error: FailedPrecondition: 400 We are preparing necessary resources. Please wait few minutes and retry., espera unos minutos y luego haz clic en Generate recommendation nuevamente.

5. Visualiza la respuesta del modelo Gemini 1.0 Pro vision.

    La respuesta está en formato tabular como se solicitó en el prompt. El modelo recomienda dos de las cuatro sillas y proporciona la justificación para la recomendación.

6. En la ventana de Cloud Shell, finaliza la aplicación y regresa al indicador de comandos presionando `CTRL + C`.

## Tarea 7. Analizar el diseño de la imagen

En esta tarea, utilizarás el modelo Gemini 1.0 Pro Vision para extraer información de una imagen después de analizar su diseño de íconos y texto.

### Actualizar la pestaña Image Playground - Oven instructions

Equipado con la capacidad de extraer información de elementos visuales en pantallas, Gemini puede analizar capturas de pantalla, íconos y diseños para proporcionar una comprensión holística de la escena representada. En esta tarea, proporcionarás una imagen del panel de control de un horno de cocina al modelo, y luego solicitarás al modelo que genere instrucciones para una función específica.

- Para implementar el código para la pestaña de Oven instructions en la pestaña Image Playground en la interfaz de usuario de la aplicación, ejecuta el siguiente comando:

    ```bash
    cat >> ~/gemini-app/app_tab3.py <<EOF

        with screens:
            oven_screen_uri = "gs://cloud-training/OCBL447/gemini-app/images/oven.jpg"
            oven_screen_url = "https://storage.googleapis.com/"+oven_screen_uri.split("gs://")[1]

            oven_screen_img = Part.from_uri(oven_screen_uri, mime_type="image/jpeg")
            st.image(oven_screen_url, width=350, caption="Image of an oven control panel")
            st.write("Provide instructions for resetting the clock on this appliance in English")

            prompt = """How can I reset the clock on this appliance? Provide the instructions in English.
                    If instructions include buttons, also explain where those buttons are physically located.
                    """

            tab1, tab2 = st.tabs(["Response", "Prompt"])
            generate_instructions_description = st.button("Generate instructions", key="generate_instructions_description")
            with tab1:
                if generate_instructions_description and prompt: 
                    with st.spinner("Generating instructions using Gemini..."):
                        response = get_gemini_pro_vision_response(multimodal_model_pro, [oven_screen_img, prompt])
                        st.markdown(response)
                        logging.info(response)
            with tab2:
                st.write("Prompt used:")
                st.text(prompt+"\n"+"input_image")
    EOF
    ```

El código anterior construye la interfaz de usuario de la pestaña de **Oven instructions**. Se utiliza una imagen del panel de control de un horno de cocina junto con texto para solicitar al modelo que genere instrucciones para una función específica disponible en el panel, en este caso, reiniciar el reloj.

![alt text](img/10.png)

### Prueba la aplicación - Image Playground - Oven instructions tab

1. Ejecuta la aplicación usando el comando proporcionado en pasos anteriores del laboratorio.

2. Para lanzar la página principal de la aplicación en tu navegador, haz clic en **Vista previa web** en la barra de menú de Cloud Shell y luego selecciona **Vista previa en el puerto 8080**.

3. Haz clic en **Image Playground** y luego en **Oven instructions**.

    La pestaña muestra una imagen del panel de control del horno.

4. Haz clic en **Generate instructions**.

5. Visualiza la respuesta del modelo Gemini 1.0 Pro Vision.

    La respuesta contiene los pasos que se pueden usar para reiniciar el reloj en el panel de control del horno. También incluye instrucciones que indican dónde localizar el botón en el panel, demostrando la capacidad del modelo para analizar el diseño del panel en la imagen.

6. En la ventana de Cloud Shell, finaliza la aplicación y regresa al indicador de comandos presionando `CTRL + C`.

## Tarea 8. Analizar diagramas ER

Las capacidades multimodales de Gemini le permiten comprender diagramas y tomar acciones, como la generación de documentación o código. En esta tarea, utilizarás el modelo Gemini 1.0 Pro Vision para analizar un diagrama de Entidad-Relación (ER) y generar documentación sobre las entidades y relaciones encontradas en el diagrama.

### Actualizar la pestaña Image Playground - Diagramas ER

En esta tarea, proporcionarás una imagen de un diagrama ER al modelo y luego solicitarás al modelo que genere documentación.

- Para implementar el código para la pestaña de **Diagramas ER** en la pestaña **Image Playground** en la interfaz de usuario de la aplicación, ejecuta el siguiente comando:

    ```bash
    cat >> ~/gemini-app/app_tab3.py <<EOF

        with diagrams:
            er_diag_uri = "gs://cloud-training/OCBL447/gemini-app/images/er.png"
            er_diag_url = "https://storage.googleapis.com/"+er_diag_uri.split("gs://")[1]

            er_diag_img = Part.from_uri(er_diag_uri,mime_type="image/png")
            st.image(er_diag_url, width=350, caption="Image of an ER diagram")
            st.write("Document the entities and relationships in this ER diagram.")

            prompt = """Document the entities and relationships in this ER diagram."""

            tab1, tab2 = st.tabs(["Response", "Prompt"])
            er_diag_img_description = st.button("Generate documentation", key="er_diag_img_description")
            with tab1:
                if er_diag_img_description and prompt: 
                    with st.spinner("Generating..."):
                        response = get_gemini_pro_vision_response(multimodal_model_pro,[er_diag_img,prompt])
                        st.markdown(response)
                        logging.info(response)
            with tab2:
                st.write("Prompt used:")
                st.text(prompt+"\n"+"input_image")

    EOF
    ```

El código anterior construye la interfaz de usuario de la pestaña de Diagramas ER. Se utiliza una imagen de un diagrama ER junto con texto para solicitar al modelo que genere documentación sobre las entidades y relaciones encontradas en el diagrama.

![alt text](img/11.png)

### Prueba la aplicación - Image Playground - ER diagramas tab

1. Ejecuta la aplicación usando el comando proporcionado en pasos anteriores del laboratorio.

2. Para lanzar la página principal de la aplicación en tu navegador, haz clic en **Vista previa web** en la barra de menú de Cloud Shell y luego selecciona **Vista previa en el puerto 8080**.

3. Haz clic en **Image Playground** y luego en **ER diagrams**.

    La pestaña muestra la imagen del diagrama ER.

4. Haz clic en **Generate documentation**

5. Visualiza la respuesta del modelo Gemini 1.0 Pro Vision.

    La respuesta contiene la lista de entidades y sus relaciones encontradas en el diagrama.

6. En la ventana de Cloud Shell, finaliza la aplicación y regresa al indicador de comandos presionando `CTRL + C`.

## Tarea 9. Razonamiento matemático

Gemini 1.0 Pro Vision también puede reconocer fórmulas y ecuaciones matemáticas, y extraer información específica de ellas. Esta capacidad es particularmente útil para generar explicaciones de problemas matemáticos.

### Actualizar la pestaña Image Playground - Math reasoning

En esta tarea, utilizarás el modelo Gemini 1.0 Pro Vision para extraer e interpretar una fórmula matemática a partir de una imagen.

- Para implementar el código para la pestaña de **Math reasoning** en la pestaña **Image Playground** en la interfaz de usuario de la aplicación, ejecuta el siguiente comando:

    ```bash
    cat >> ~/gemini-app/app_tab3.py <<EOF

        with equations:
            math_image_uri = "gs://cloud-training/OCBL447/gemini-app/images/math_eqn.jpg"
            math_image_url = "https://storage.googleapis.com/"+math_image_uri.split("gs://")[1]

            math_image_img = Part.from_uri(math_image_uri,mime_type="image/jpeg")
            st.image(math_image_url,width=350, caption="Image of a math equation")
            st.markdown(f"""
                    Ask questions about the math equation as follows: 
                    - Extract the formula.
                    - What is the symbol right before Pi? What does it mean?
                    - Is this a famous formula? Does it have a name?
                        """)

            prompt = """Follow the instructions. Surround math expressions with $. Use a table with a row for each instruction and its result.
                    INSTRUCTIONS:
                    - Extract the formula.
                    - What is the symbol right before Pi? What does it mean?
                    - Is this a famous formula? Does it have a name?
                    """

            tab1, tab2 = st.tabs(["Response", "Prompt"])
            math_image_description = st.button("Generate answers", key="math_image_description")
            with tab1:
                if math_image_description and prompt: 
                    with st.spinner("Generating answers for formula using Gemini..."):
                        response = get_gemini_pro_vision_response(multimodal_model_pro, [math_image_img, prompt])
                        st.markdown(response)
                        logging.info(response)
            with tab2:
                st.write("Prompt used:")
                st.text(prompt)

    EOF
    ```

El código anterior construye la interfaz de usuario de la pestaña de Math reasoning. Se utiliza una imagen de una ecuación matemática junto con texto para solicitar al modelo que genere respuestas y otras características sobre la ecuación.

![alt text](img/12.png)

### Prueba la aplicación - Image Playground - Math reasoning tab

1. Ejecuta la aplicación usando el comando proporcionado en pasos anteriores del laboratorio.

2. Para lanzar la página principal de la aplicación en tu navegador, haz clic en **Vista previa web** en la barra de menú de Cloud Shell y luego selecciona **Vista previa en el puerto 8080**.

3. Haz clic en **Image Playground** y luego en **Math reasoning**.

   La pestaña muestra una imagen que contiene la ecuación matemática.

4. Haz clic en **Generate answers**.

5. Visualiza la respuesta del modelo Gemini 1.0 Pro Vision.

    La respuesta contiene las respuestas a las preguntas suministradas en el prompt al modelo.

6. En la ventana de Cloud Shell, finaliza la aplicación y regresa al indicador de comandos presionando `CTRL + C`.

## Tarea 10. Generar el video playground

En esta tarea, utilizarás el modelo Gemini 1.0 Pro Vision para procesar videos y generar etiquetas e información a partir de los videos suministrados al modelo.

### Desarrollar la pestaña 4 - Video Playground

El modelo Gemini 1.0 Pro Vision también puede proporcionar la descripción de lo que ocurre en un video. En esta subtarea, implementarás el código para la pestaña **Video Playground** y el código para interactuar con el modelo para generar la descripción de un video.

1. Para escribir el código que renderiza la pestaña **Video Playground** en la interfaz de usuario de la aplicación, ejecuta el siguiente comando:

    ```bash
    cat > ~/gemini-app/app_tab4.py <<EOF
    import streamlit as st
    from vertexai.preview.generative_models import GenerativeModel, Part
    from response_utils import *
    import logging

    # render the Video Playground tab with multiple child tabs
    def render_video_playground_tab(multimodal_model_pro: GenerativeModel):

        st.write("Using Gemini 1.0 Pro Vision - Multimodal model")
        video_desc, video_tags, video_highlights, video_geoloc = st.tabs(["Video description", "Video tags", "Video highlights", "Video geolocation"])

        with video_desc:
            video_desc_uri = "gs://cloud-training/OCBL447/gemini-app/videos/mediterraneansea.mp4"
            video_desc_url = "https://storage.googleapis.com/"+video_desc_uri.split("gs://")[1]            

            video_desc_vid = Part.from_uri(video_desc_uri, mime_type="video/mp4")
            st.video(video_desc_url)
            st.write("Generate a description of the video.")

            prompt = """Describe what is happening in the video and answer the following questions: \n
                    - What am I looking at?
                    - Where should I go to see it?
                    - What are other top 5 places in the world that look like this? 
                    """

            tab1, tab2 = st.tabs(["Response", "Prompt"])
            video_desc_description = st.button("Generate video description", key="video_desc_description")
            with tab1:
                if video_desc_description and prompt: 
                    with st.spinner("Generating video description"):
                        response = get_gemini_pro_vision_response(multimodal_model_pro, [prompt, video_desc_vid])
                        st.markdown(response)
                        logging.info(response)
            with tab2:
                st.write("Prompt used:")
                st.write(prompt,"\n","{video_data}")

    EOF
    ```

2. Visualiza el contenido del archivo `app_tab4.py`:

    ```bash
    cat ~/gemini-app/app_tab4.py
    ```

La función `render_video_playground_tab` construye la interfaz de usuario que permite al usuario de la aplicación interactuar con el modelo Gemini 1.0 Pro Vision. Crea un conjunto de pestañas: "Video description", "Video tags", "Video highlights", "Video geolocation" en la interfaz de usuario. Escribirás el código para las pestañas restantes en tareas posteriores de este laboratorio.

La pestaña `Video description` utiliza un prompt junto con el video para generar una descripción del video e identificar otros lugares que se parezcan al lugar en el vídeo.

### Modifica el punto de entrada principal de la aplicación (pestaña 4)

- Para agregar la **pestaña 4** a la aplicación, ejecuta el siguiente comando:

    ```bash
    cat >> ~/gemini-app/app.py <<EOF

    from app_tab4 import render_video_playground_tab

    with tab4:
        render_video_playground_tab(multimodal_model_pro)

    EOF
    ```

### Prueba la aplicación - Video Playground tab

1. Ejecuta la aplicación usando el comando proporcionado en pasos anteriores del laboratorio.

2. Para lanzar la página principal de la aplicación en tu navegador, haz clic en **Vista previa web** en la barra de menú de Cloud Shell y luego selecciona V**ista previa en el puerto 8080**.

3. Haz clic en **Video Playground** y luego en **Video description**.

4. La pestaña muestra el video de un lugar. Haz clic para reproducir el video.

5. Haz clic en **Generate video description**.

6. Visualiza la respuesta del modelo Gemini 1.0 Pro Vision.

   La respuesta contiene una descripción del lugar y 5 otros lugares que se ven similares.

7. En la ventana de Cloud Shell, finaliza la aplicación y regresa al indicador de comandos presionando `CTRL + C`.

## Tarea 11. Generar etiquetas de video

En esta tarea, utilizarás el modelo Gemini 1.0 Pro Vision para generar etiquetas a partir de un video.

### Actualizar la pestaña Image Playground - Video tags

- Para implementar el código para la pestaña de **Video tags** en la pestaña **Video Playground** en la interfaz de usuario de la aplicación, ejecuta el siguiente comando:

    ```bash
    cat >> ~/gemini-app/app_tab4.py <<EOF

        with video_tags:
            video_tags_uri = "gs://cloud-training/OCBL447/gemini-app/videos/photography.mp4"
            video_tags_url = "https://storage.googleapis.com/"+video_tags_uri.split("gs://")[1]

            video_tags_vid = Part.from_uri(video_tags_uri, mime_type="video/mp4")
            st.video(video_tags_url)
            st.write("Generate tags for the video.")

            prompt = """Answer the following questions using the video only:
                        1. What is in the video?
                        2. What objects are in the video?
                        3. What is the action in the video?
                        4. Provide 5 best tags for this video?
                        Write the answer in table format with the questions and answers in columns.
                    """

            tab1, tab2 = st.tabs(["Response", "Prompt"])
            video_tags_desc = st.button("Generate video tags", key="video_tags_desc")
            with tab1:
                if video_tags_desc and prompt: 
                    with st.spinner("Generating video tags"):
                        response = get_gemini_pro_vision_response(multimodal_model_pro, [prompt, video_tags_vid])
                        st.markdown(response)
                        logging.info(response)
            with tab2:
                st.write("Prompt used:")
                st.write(prompt,"\n","{video_data}")

    EOF
    ```

El código anterior construye la interfaz de usuario de la pestaña de Video tags. Se utiliza un video junto con texto para solicitar al modelo que genere etiquetas y responda preguntas sobre las escenas en el video.

### Prueba la aplicación - Video Playground - Video tags tab

1. Ejecuta la aplicación usando el comando proporcionado en pasos anteriores del laboratorio.

2. Para lanzar la página principal de la aplicación en tu navegador, haz clic en **Vista previa web** en la barra de menú de Cloud Shell y luego selecciona **Vista previa en el puerto 8080**.

3. Haz clic en **Video Playground** y luego en **Video tags**.

4. La pestaña muestra el video que se utilizará para solicitar al modelo. Haz clic para reproducir el video.

5. Haz clic en **Generate video tags**.

6. Visualiza la respuesta del modelo Gemini 1.0 Pro Vision.

    La respuesta contiene las respuestas a las preguntas que se proporcionaron en el prompt al modelo. Las preguntas y respuestas se muestran en formato tabular e incluyen 5 etiquetas como se solicitó.

7. En la ventana de Cloud Shell, finaliza la aplicación y regresa al indicador de comandos presionando `CTRL + C`.

## Tarea 12. Generar destacados del video

En esta tarea, utilizarás el modelo Gemini 1.0 Pro Vision para generar destacados de un video que incluyan información sobre los objetos, personas y contexto mostrado en el video.

### Actualizar la pestaña Image Playground - Video highlights

- Para implementar el código para la pestaña de **Video highlights** en la pestaña **Video Playground** en la interfaz de usuario de la aplicación, ejecuta el siguiente comando:

    ```bash
    cat >> ~/gemini-app/app_tab4.py <<EOF

        with video_highlights:
            video_highlights_uri = "gs://cloud-training/OCBL447/gemini-app/videos/pixel8.mp4"
            video_highlights_url = "https://storage.googleapis.com/"+video_highlights_uri.split("gs://")[1]

            video_highlights_vid = Part.from_uri(video_highlights_uri, mime_type="video/mp4")
            st.video(video_highlights_url)
            st.write("Generate highlights for the video.")

            prompt = """Answer the following questions using the video only:
                    What is the profession of the girl in this video?
                    Which features of the phone are highlighted here?
                    Summarize the video in one paragraph.
                    Write these questions and their answers in table format. 
                    """

            tab1, tab2 = st.tabs(["Response", "Prompt"])
            video_highlights_description = st.button("Generate video highlights", key="video_highlights_description")
            with tab1:
                if video_highlights_description and prompt: 
                    with st.spinner("Generating video highlights"):
                        response = get_gemini_pro_vision_response(multimodal_model_pro, [prompt, video_highlights_vid])
                        st.markdown(response)
                        logging.info(response)
            with tab2:
                st.write("Prompt used:")
                st.write(prompt,"\n","{video_data}")

    EOF
    ```

El código anterior construye la interfaz de usuario de la pestaña de **Video highlights**. Se utiliza un video junto con texto para solicitar al modelo que genere destacados del video.

### Prueba la aplicación - Video Playground - Video highlights tab

1. Ejecuta la aplicación usando el comando proporcionado en pasos anteriores del laboratorio.

2. Para lanzar la página principal de la aplicación en tu navegador, haz clic en **Vista previa web** en la barra de menú de Cloud Shell y luego selecciona **Vista previa en el puerto 8080**.

3. Haz clic en **Video Playground** y luego en **Video highlights**.

4. La pestaña muestra el video que se utilizará para solicitar al modelo. Haz clic para reproducir el video.

5. Haz clic en **Generate video hightlights**.

6. Visualiza la respuesta del modelo Gemini 1.0 Pro Vision.

    La respuesta contiene las respuestas a las preguntas que se proporcionaron en el prompt al modelo. Las preguntas y respuestas se muestran en formato tabular e incluyen características del video, como la profesión de la chica y las características del teléfono que se utilizan. La respuesta también contiene una descripción general de las escenas del video.

7. En la ventana de Cloud Shell, finaliza la aplicación y regresa al indicador de comandos presionando `CTRL + C`.

## Tarea 13. Generar ubicación del video

En esta tarea, utilizarás el modelo Gemini 1.0 Pro Vision para determinar la ubicación donde tiene lugar la escena en el video.

### Actualizar la pestaña Image Playground - Video geolocation

- Para implementar el código para la pestaña de **Video geolocation** en la pestaña **Video Playground** en la interfaz de usuario de la aplicación, ejecuta el siguiente comando:

    ```bash
    cat >> ~/gemini-app/app_tab4.py <<EOF

        with video_geoloc:
            video_geolocation_uri = "gs://cloud-training/OCBL447/gemini-app/videos/bus.mp4"
            video_geolocation_url = "https://storage.googleapis.com/"+video_geolocation_uri.split("gs://")[1]

            video_geolocation_vid = Part.from_uri(video_geolocation_uri, mime_type="video/mp4")
            st.video(video_geolocation_url)
            st.markdown("""Answer the following questions from the video:
                        - What is this video about?
                        - How do you know which city it is?
                        - What street is this?
                        - What is the nearest intersection?
                        """)

            prompt = """Answer the following questions using the video only:
                    What is this video about?
                    How do you know which city it is?
                    What street is this?
                    What is the nearest intersection?
                    Answer the following questions using a table format with the questions and answers as columns. 
                    """

            tab1, tab2 = st.tabs(["Response", "Prompt"])
            video_geolocation_description = st.button("Generate", key="video_geolocation_description")
            with tab1:
                if video_geolocation_description and prompt: 
                    with st.spinner("Generating location information"):
                        response = get_gemini_pro_vision_response(multimodal_model_pro, [prompt, video_geolocation_vid])
                        st.markdown(response)
                        logging.info(response)
            with tab2:
                st.write("Prompt used:")
                st.write(prompt,"\n","{video_data}")

    EOF
    ```

El código anterior construye la interfaz de usuario de la pestaña de **Video geolocation**. Se utiliza un video junto con texto para solicitar al modelo que responda preguntas sobre el video, incluyendo información de ubicación sobre las entidades vistas en el video.

### Prueba la aplicación - Video Playground - Video geolocation tab

1. Ejecuta la aplicación usando el comando proporcionado en pasos anteriores del laboratorio.

2. Para lanzar la página principal de la aplicación en tu navegador, haz clic en **Vista previa web** en la barra de menú de Cloud Shell y luego selecciona **Vista previa en el puerto 8080**.

3. Haz clic en **Video Playground** y luego en **Video geolocation**.

4. La pestaña muestra el video que se utilizará para solicitar al modelo. Haz clic para reproducir el video.

5. Haz clic en **Generate**.

6. Visualiza la respuesta del modelo Gemini 1.0 Pro Vision.

    La respuesta contiene las respuestas a las preguntas que se proporcionaron en el prompt al modelo. Las preguntas y respuestas se muestran en formato tabular e incluyen la información de ubicación solicitada.

7. En la ventana de Cloud Shell, finaliza la aplicación y regresa al indicador de comandos presionando `CTRL + C`.

## Tarea 14. Desplegar la aplicación en Cloud Run

Ahora que has probado la aplicación localmente, puedes hacerla disponible para otros desplegándola en Cloud Run en Google Cloud. Cloud Run es una plataforma de cómputo gestionada que te permite ejecutar contenedores de aplicaciones sobre la infraestructura escalable de Google.

### Configurar el entorno para desplegar

1. Asegúrate de estar en el directorio de la aplicación:

    ```bash
    cd ~/gemini-app
    ```

2. Verifica que las variables de entorno PROJECT_ID y REGION estén configuradas:

    ```bash
    echo "PROJECT_ID=${PROJECT_ID}"
    echo "REGION=${REGION}"
    ```

3. Si estas variables de entorno no están configuradas, ejecuta el comando para configurarlas:

    ```bash
    PROJECT_ID=$(gcloud config get-value project)
    REGION=us-central1
    echo "PROJECT_ID=${PROJECT_ID}"
    echo "REGION=${REGION}"
    ```

4. Configura las variables de entorno para tu servicio y repositorio de artefactos:

    ```bash
    SERVICE_NAME='gemini-app-playground' # Name of your Cloud Run service.
    AR_REPO='gemini-app-repo'            # Name of your repository in Artifact Registry that stores your application container image.
    echo "SERVICE_NAME=${SERVICE_NAME}"
    echo "AR_REPO=${AR_REPO}"
    ```

> Para el `SERVICE_NAME`, modifica el nombre del servicio de Cloud Run agregando las iniciales de tu nombre al final del nombre del servicio. Por ejemplo, si Mario Andrés Interiano Cea está desarrollando el laboratorio: `SERVICE_NAME='gemini-app-playground-maic'`. Realiza el mismo ajuste para `AR_REPO`. Por ejemplo: `AR_REPO='gemini-app-repo-maic'`.

### Crear el repositorio de Docker

1. Para crear el repositorio en Artifact Registry, ejecuta el comando:

    ```bash
    gcloud artifacts repositories create "$AR_REPO" --location="$REGION" --repository-format=Docker
    ```

    > Artifact Registry es un servicio de Google Cloud que proporciona una ubicación única para almacenar y gestionar tus paquetes de software e imágenes de contenedores Docker.

2. Configura la autenticación para el repositorio:

    ```bash
    gcloud auth configure-docker "$REGION-docker.pkg.dev"
    ```

### Construir la imagen del contenedor

Usaremos un `Dockerfile` para construir la imagen del contenedor para nuestra aplicación. Un `Dockerfile` es un documento de texto que contiene todos los comandos que un usuario podría llamar en la línea de comandos para ensamblar una imagen de contenedor. Se utiliza con Docker, una plataforma de contenedores que construye y ejecuta imágenes de contenedores.

1. Para crear un `Dockerfile`, ejecuta el comando:

    ```bash
    cat > ~/gemini-app/Dockerfile <<EOF
    FROM python:3.8

    EXPOSE 8080
    WORKDIR /app

    COPY . ./

    RUN pip install -r requirements.txt

    ENTRYPOINT ["streamlit", "run", "app.py", "--server.port=8080", "--server.address=0.0.0.0"]

    EOF
    ```

2. Para construir la imagen del contenedor para tu aplicación, ejecuta el comando:

    ```bash
    gcloud builds submit --tag "$REGION-docker.pkg.dev/$PROJECT_ID/$AR_REPO/$SERVICE_NAME"
    ```

    El comando `gcloud builds submit` envía una construcción utilizando Cloud Build. Cuando se usa con el indicador `--tag`, Cloud Build utiliza un Dockerfile para construir una imagen de contenedor a partir de los archivos de la aplicación en tu directorio de origen.

    Cloud Build es un servicio que ejecuta construcciones basadas en tus especificaciones en Google Cloud y produce artefactos como contenedores Docker o archivos Java.

Espera a que el comando termine antes de avanzar al siguiente paso.

### Desplegar y probar tu aplicación en Cloud Run

La tarea final es desplegar el servicio en Cloud Run con la imagen que se construyó y subió al repositorio en Artifact Registry.

1. Para desplegar tu aplicación en Cloud Run, ejecuta el comando:

    ```bash
    gcloud run deploy "$SERVICE_NAME" \
    --port=8080 \
    --image="$REGION-docker.pkg.dev/$PROJECT_ID/$AR_REPO/$SERVICE_NAME" \
    --allow-unauthenticated \
    --region=$REGION \
    --platform=managed  \
    --project=$PROJECT_ID \
    --set-env-vars=PROJECT_ID=$PROJECT_ID,REGION=$REGION
    ```

2. Después de que el servicio esté desplegado, se generará una URL para el servicio en la salida del comando anterior. Para probar tu aplicación en Cloud Run, navega a esa URL en una pestaña o ventana de navegador separada.

3. Elige la funcionalidad de la aplicación que deseas probar. La aplicación solicitará a la API de Vertex AI Gemini que genere y muestre las respuestas.

## ¡Felicidades! Haz terminado el laboratorio

En esta laboratorio has:

- Desarrollado una aplicación en Python utilizando el framework Streamlit.

- Instalado el SDK de Vertex AI para Python.

- Desarrollado código para interactuar con el modelo Gemini 1.0 Pro (gemini-pro) utilizando la API de Vertex AI Gemini.

- Utilizado prompts de texto con el modelo para generar una historia y una campaña de marketing.

- Desarrollado código para interactuar con el modelo Gemini 1.0 Pro Vision (gemini-pro-vision) utilizando la API de Vertex AI Gemini.

- Utilizado texto, imágenes y videos con el modelo para procesar y extraer información de imágenes y videos.

- Desplegado y probado la aplicación en Cloud Run.
