# Developing Applications with Google Cloud: Storing Application Data

## Tarea 1: Configurar el entorno

1. **Visitar la página de instalación del SDK de Google Cloud:**
   - Abre el siguiente enlace para acceder a la página de instalación del SDK de Google Cloud: [Google Cloud SDK - Documentación de instalación](https://cloud.google.com/sdk/docs/install?hl=es-419)

2. **Instalación en Windows:**
   - Abre **PowerShell** con permisos de administrador.
   - Ejecuta el siguiente comando para descargar e instalar el SDK de Google Cloud:

     ```powershell
     (New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")
     & $env:Temp\GoogleCloudSDKInstaller.exe
     ```

   - Deja todos los ajustes por defecto durante la instalación.

3. **Instalación en otros sistemas operativos:**
   - Sigue las instrucciones específicas en la página mencionada anteriormente según tu sistema operativo.

4. **Verificar la instalación:**
   - Una vez completada la instalación, verifica que se haya instalado correctamente ejecutando el siguiente comando en la terminal o PowerShell:

     ```bash
     gcloud --version
     ```

5. **Autenticación en Google Cloud:**
   - Desde PowerShell (o la terminal de tu sistema), inicia sesión en tu cuenta de Google ejecutando:

     ```bash
     gcloud auth login
     ```

   - Selecciona tu cuenta de Google y confirma los permisos cuando se te solicite.

6. **Inicializar la configuración de gcloud:**
   - Ejecuta el siguiente comando para inicializar la configuración:

     ```bash
     gcloud init
     ```

   - Selecciona la opción para inicializar con la configuración por defecto.
   - Elige la cuenta con la que te has autenticado previamente.
   - Selecciona el proyecto en el que vas a trabajar.


## Tarea 2: Crear y probar una aplicación web simple en Python Flask

### Paso 1: Confirmar la autorización de Cloud Shell

Para confirmar que Cloud Shell está autorizado, ejecuta el siguiente comando en Cloud Shell:

```gcloud auth list```

Si se te solicita autorizar Cloud Shell, haz clic en Authorize.

### Paso 2: Crear el directorio de la aplicación

Para crear el directorio de la aplicación, ejecuta el siguiente comando:

```mkdir ~/bookshelf```

Los archivos de la aplicación se crearán en el directorio `~/bookshelf.`

### Paso 3: Especificar e instalar los requisitos

Crea el archivo de requisitos ejecutando el siguiente comando:

```
cat > ~/bookshelf/requirements.txt <<EOF
Flask==2.3.3
gunicorn==21.2.0
google-cloud-logging==3.6.0
EOF
```

Para instalar las versiones seleccionadas de las dependencias, ejecuta el siguiente comando:

```pip3 install -r ~/bookshelf/requirements.txt --user```

> Nota: pip es el instalador de paquetes para Python. Este comando instala los paquetes especificados en el archivo requirements.txt para su uso con la versión 3 de Python.

### Paso 4: Crear la implementación de la base de datos de libros

Crea el archivo `booksdb.py` ejecutando el siguiente comando:

```
cat > ~/bookshelf/booksdb.py <<EOF
db = {}       # global in-memory python dictionary, key should always be a string
next_id = 1   # next book ID to use


def get_next_id():
    """
    Return the next ID. Automatically increments when retrieving one.
    """
    global next_id
    id = next_id

    # next ID is 1 higher
    next_id = next_id + 1

    # return a string version of the ID
    return str(id)


def read(book_id):
    """
    Return the details for a single book.
    """

    # retrieve a book from the database by ID
    data = db[str(book_id)]
    return data


def create(data):
    """
    Create a new book and return the book details.
    """

    # get a new ID for the book
    book_id = get_next_id()

    # set the ID in the book data
    data['id'] = book_id

    # store book in database
    db[book_id] = data
    return data


def update(data, book_id):
    """
    Update an existing book, and return the updated book's details.
    """

    # book ID should always be a string
    book_id_str = str(book_id)

    # add ID to the book data
    data['id'] = book_id_str

    # update book in the database
    db[book_id_str] = data
    return data


def delete(book_id):
    """
    Delete a book in the database.
    """

    # remove book from database
    del db[str(book_id)]

    # no return required


def list():
    """
    Return a list of all books in the database.
    """

    # empty list of books
    books = []

    # retrieve each item in database and add to the list
    for k in db:
        books.append(db[k])

    # return the list
    return books

EOF
```

### Paso 5: Crear los archivos de plantilla HTM

Crea la plantilla base ejecutando el siguiente comando:

```
mkdir ~/bookshelf/templates
cat > ~/bookshelf/templates/base.html <<EOF
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Bookshelf</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    </head>
    <body>
        <div class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <div class="navbar-brand">Bookshelf</div>
                </div>
                <ul class="nav navbar-nav">
                    <li><a href="/">Books</a></li>
                </ul>
            </div>
        </div>
        <div class="container">
            {% block content %}{% endblock %}
        </div>
    </body>
</html>

EOF
```
> Nota: Cada página de la aplicación tiene el mismo diseño básico con un cuerpo diferente. Cada una de las tres plantillas principales (lista, vista, formulario) extiende esta plantilla base especificando el contenido que va en el centro de la página.

Crea la plantilla de lista con el siguiente comando:

```
cat > ~/bookshelf/templates/list.html <<EOF
{% extends "base.html" %}

{% block content %}

<h3>Books</h3>

<a href="/books/add" class="btn btn-success btn-sm">
    <i class="glyphicon glyphicon-plus"></i>
    Add book
</a>

{% for book in books %}
<div class="media">
    <a href="/books/{{book.id}}">
        <div class="media-body">
            <h4>{{book.title}}</h4>
            <p>{{book.author}}</p>
        </div>
    </a>
</div>
{% else %}
<p>No books found</p>
{% endfor %}

{% endblock %}

EOF
```

Crea la plantilla de vista con el siguiente comando:

```
cat > ~/bookshelf/templates/view.html <<EOF
{% extends "base.html" %}

{% block content %}

<h3>Book</h3>

<div class="btn-group">
    <a href="/books/{{book.id}}/edit" class="btn btn-primary btn-sm">
        <i class="glyphicon glyphicon-edit"></i>
        Edit book
    </a>
    <a href="/books/{{book.id}}/delete" class="btn btn-danger btn-sm">
        <i class="glyphicon glyphicon-trash"></i>
        Delete book
    </a>
</div>

<div class="media">
    <div class="media-body">
        <h4 class="book-title">
            {{book.title}}
            <small>{{book.publishedDate}}</small>
        </h4>
        <h5 class="book-author">By {{book.author|default('Unknown', True)}}</h5>
        <p class="book-description">{{book.description}}</p>
    </div>
</div>

{% endblock %}

EOF
```

Crea la plantilla de formulario con el siguiente comando:

```
cat > ~/bookshelf/templates/form.html <<EOF
{# [START form] #}
{% extends "base.html" %}

{% block content %}

<h3>{{action}} book</h3>

<form method="POST" enctype="multipart/form-data">

    <div class="form-group">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" value="{{book.title}}" class="form-control"/>
    </div>

    <div class="form-group">
        <label for="author">Author</label>
        <input type="text" name="author" id="author" value="{{book.author}}" class="form-control"/>
    </div>

    <div class="form-group">
        <label for="publishedDate">Date Published</label>
        <input type="text" name="publishedDate" id="publishedDate" value="{{book.publishedDate}}" class="form-control"/>
    </div>

    <div class="form-group">
        <label for="description">Description</label>
        <textarea name="description" id="description" class="form-control">{{book.description}}</textarea>
    </div>

    <button type="submit" class="btn btn-success">Save</button>
</form>

{% endblock %}

{# [END form] #}

EOF
```

### Paso 6: Crear el archivo principal de código

Crea el archivo `main.py` ejecutando el siguiente comando:

```
cat > ~/bookshelf/main.py <<EOF
from flask import current_app, Flask, redirect, render_template
from flask import request, url_for
import logging
from google.cloud import logging as cloud_logging

import booksdb

app = Flask(__name__)
app.config.update(
    SECRET_KEY='secret', # don't store SECRET_KEY in code in a production app
    MAX_CONTENT_LENGTH=8 * 1024 * 1024,
)

app.debug = True
app.testing = False

# configure logging
if not app.testing:
    logging.basicConfig(level=logging.INFO)

    # attach a Cloud Logging handler to the root logger
    client = cloud_logging.Client()
    client.setup_logging()

def log_request(req):
    """
    Log request
    """
    current_app.logger.info('REQ: {0} {1}'.format(req.method, req.url))


@app.route('/')
def list():
    """
    Display all books.
    """
    log_request(request)

    # get list of books
    books = booksdb.list()

    # render list of books
    return render_template('list.html', books=books)


@app.route('/books/<book_id>')
def view(book_id):
    """
    View the details of a specified book.
    """
    log_request(request)

    # retrieve a specific book
    book = booksdb.read(book_id)

    # render book details
    return render_template('view.html', book=book)


@app.route('/books/add', methods=['GET', 'POST'])
def add():
    """
    If GET, show the form to collect details of a new book.
    If POST, create the new book based on the specified form.
    """
    log_request(request)

    # Save details if form was posted
    if request.method == 'POST':

        # get book details from form
        data = request.form.to_dict(flat=True)

        # add book
        book = booksdb.create(data)

        # render book details
        return redirect(url_for('.view', book_id=book['id']))

    # render form to add book
    return render_template('form.html', action='Add', book={})


@app.route('/books/<book_id>/edit', methods=['GET', 'POST'])
def edit(book_id):
    """
    If GET, show the form to collect updated details for a book.
    If POST, update the book based on the specified form.
    """
    log_request(request)

    # read existing book details
    book = booksdb.read(book_id)

    # Save details if form was posted
    if request.method == 'POST':

        # get book details from form
        data = request.form.to_dict(flat=True)

        # update book
        book = booksdb.update(data, book_id)

        # render book details
        return redirect(url_for('.view', book_id=book['id']))

    # render form to update book
    return render_template('form.html', action='Edit', book=book)


@app.route('/books/<book_id>/delete')
def delete(book_id):
    """
    Delete the specified book and return to the book list.
    """
    log_request(request)

    # delete book
    booksdb.delete(book_id)

    # render list of remaining books
    return redirect(url_for('.list'))


# this is only used when running locally
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)

EOF
```

> Nota: Este archivo principal de código configura el enrutamiento y la lógica de la aplicación Flask. Define las rutas para listar, ver, agregar, editar y eliminar libros. La base de datos se maneja a través de funciones definidas en el archivo booksdb.py.

### Paso 7: Probar la aplicación

1. Verifica el contenido del directorio bookshelf ejecutando el siguiente comando:

```
cd ~
ls -R bookshelf
```

2. Ejecuta el servidor HTTP Gunicorn con el siguiente comando:

```
cd ~/bookshelf; ~/.local/bin/gunicorn -b :8080 main:app
```

> Nota: Gunicorn es un servidor WSGI para Python que se utiliza para implementar aplicaciones Flask en producción.

3. Para ejecutar la aplicación en el navegador web, haz clic en Web Preview (Previsualizar Web) y luego selecciona Preview on port 8080 (Previsualizar en el puerto 8080).

4. En la nueva pestaña del navegador, deberías ver la aplicación en funcionamiento. Puedes añadir, editar o eliminar libros usando la interfaz proporcionada.

5. Para salir de la aplicación en la terminal, presiona CTRL-C.

## Tarea 3: Usar Firestore para la base de datos de libros

En esta tarea, modificarás la aplicación para usar Firestore como la base de datos en lugar de un diccionario en memoria. A continuación se detallan los pasos para configurar Firestore y actualizar la aplicación.

### Paso 1: Crear la base de datos de Firestore

1. En la consola de Google Cloud, selecciona el menú de navegación y luego selecciona **Más productos > Bases de datos > Firestore.**

2. Haz clic en **Crear base de datos.**

3. Selecciona **Modo nativo** y haz clic en **Continuar.**

4. Para el tipo de ubicación, selecciona **Región.**

5. Selecciona la región y haz clic en **Crear base de datos.**

6. Espera a que se cree la base de datos.

> Nota: No es necesario crear una colección de libros manualmente. Firestore creará la colección automáticamente cuando añadas un documento.

### Paso 2: Modificar la aplicación para requerir el cliente de Firestore

Abre el archivo `requirements.txt` en el editor y agrega la dependencia de Firestore:

```
google-cloud-firestore==2.12.0
```

Instala las dependencias actualizadas ejecutando el siguiente comando:

```
pip3 install -r ~/bookshelf/requirements.txt --user
```

### Paso 3: Modificar la aplicación para almacenar datos en Firestore

Abre el archivo `booksdb.py` y elimina las siguientes líneas:

```
db = {}       # global in-memory python dictionary, key should always be a string
next_id = 1   # next book ID to use

def get_next_id():
    """
    Return the next ID. Automatically increments when retrieving one.
    """
    global next_id
    id = next_id

    # next ID is 1 higher
    next_id = next_id + 1

    # return a string version of the ID
    return str(id)
```

Importa el cliente de Firestore agregando la siguiente línea al inicio del archivo:

```
from google.cloud import firestore
```

Crea una función para convertir un documento de Firestore en un diccionario:

```
def document_to_dict(doc):
    """
    Convert Firestore document to a Python dictionary.
    """
    if not doc.exists:
        return None
    doc_dict = doc.to_dict()
    doc_dict['id'] = doc.id
    return doc_dict
```

Modifica las funciones de la base de datos para que interactúen con Firestore.

```

def read(book_id):
    """
    Return the details for a single book.
    """

    db = firestore.Client()

    # retrieve a book from the database by ID
    book_ref = db.collection("books").document(book_id)
    return document_to_dict(book_ref.get())


def create(data):
    """
    Create a new book and return the book details.
    """

    db = firestore.Client()

    # store book in database
    book_ref = db.collection("books").document()
    book_ref.set(data)
    return document_to_dict(book_ref.get())


def update(data, book_id):
    """
    Update an existing book, and return the updated book's details.
    """

    db = firestore.Client()

    # update book in database
    book_ref = db.collection("books").document(book_id)
    book_ref.set(data)
    return document_to_dict(book_ref.get())


def delete(book_id):
    """
    Delete a book in the database.
    """

    db = firestore.Client()

    # remove book from database
    book_ref = db.collection("books").document(book_id)
    book_ref.delete()

    # no return required


def list():
    """
    Return a list of all books in the database, ordered by title.
    """

    # empty list of books
    books = []

    db = firestore.Client()

    # get an ordered list of documents in the collection
    docs = db.collection("books").order_by("title").stream()

    # retrieve each item in database and add to the list
    for doc in docs:
        books.append(document_to_dict(doc))

    # return the list
    return books
```

## Paso 4: Probar la aplicación actualizada

En Cloud Shell, ejecuta el servidor web con el siguiente comando:

```
cd ~/bookshelf; ~/.local/bin/gunicorn -b :8080 main:app
```

1. Para ejecutar la aplicación en el navegador web, haz clic en Web Preview (Previsualizar Web) y luego selecciona Preview on port 8080 (Previsualizar en el puerto 8080).

2. Añade un nuevo libro para verificar que los datos se almacenan en Firestore.

| **Field**       | **Value**                                                                |
|-----------------|--------------------------------------------------------------------------|
| **Title**       | Hamlet                                                                   |
| **Author**      | William Shakespeare                                                      |
| **Date Published** | 1603                                                                 |
| **Description** | A prince contemplates life, death, and revenge, but mostly just makes puns. |

3. En la consola de Google Cloud, navega a Firestore y verifica que los datos se han guardado correctamente.

4. Para salir de la aplicación en Cloud Shell, presiona CTRL-C.

## Tarea 3: Usar Cloud Storage para Portadas de Libros

Para almacenar y gestionar las imágenes de las portadas de libros usando Google Cloud Storage, sigue estos pasos:

### Paso 1: Crear el Bucket de Cloud Storage

**Navegar a Cloud Storage:**
1. En la consola de Google Cloud, ve a **Menú de navegación > Cloud Storage > Buckets**.

**Crear un Nuevo Bucket:**
1. Haz clic en **+Crear**.
2. Para el **Nombre del Bucket**, usa `project_id-covers`.
3. Haz clic en **Continuar**.

**Configurar la Región del Bucket:**
1. Selecciona **Región** y elige la región establecida al inicio del laboratorio.
2. Haz clic en **Continuar**.

**Configurar el Control de Acceso:**
1. Deja la clase de almacenamiento como está y haz clic en **Continuar**.
2. Desactiva la opción **Imponer la prevención de acceso público en este bucket**.
3. Haz clic en **Crear**.

**Establecer Permisos:**
1. Ve a la pestaña **Permisos** y haz clic en **Otorgar acceso**.
2. Para **Nuevos Principales**, ingresa `allUsers`.
3. Para **Rol**, selecciona **Cloud Storage Legacy > Storage Legacy Object Reader**.
4. Haz clic en **Guardar** y confirma si se te solicita.

### Paso 2: Actualizar el Archivo de Requerimientos

Abre ~/bookshelf/requirements.txt y añade la siguiente línea:

```
google-cloud-storage==2.10.0
```

Instala las dependencias actualizadas, ejecuta el siguiente comando en Cloud Shell:

```
pip3 install -r ~/bookshelf/requirements.txt --user
```
### Paso 3: Crear Código para Subir Imágenes a Cloud Storage

Ejecuta el siguiente comando para crear el archivo `storage.py`:

```
cat > ~/bookshelf/storage.py <<EOF
from __future__ import absolute_import

import datetime
import os

from flask import current_app
from werkzeug.exceptions import BadRequest
from werkzeug.utils import secure_filename

from google.cloud import storage


def _check_extension(filename, allowed_extensions):
    """
    Validates that the filename's extension is allowed.
    """
    _, ext = os.path.splitext(filename)
    if (ext.replace('.', '') not in allowed_extensions):
        raise BadRequest(
            '{0} has an invalid name or extension'.format(filename))


def _safe_filename(filename):
    """
    Generates a safe filename that is unlikely to collide with existing
    objects in Cloud Storage.

    filename.ext is transformed into filename-YYYY-MM-DD-HHMMSS.ext
    """
    filename = secure_filename(filename)
    date = datetime.datetime.utcnow().strftime("%Y-%m-%d-%H%M%S")
    basename, extension = filename.rsplit('.', 1)
    return "{0}-{1}.{2}".format(basename, date, extension)


def upload_file(file_stream, filename, content_type):
    """
    Uploads a file to a given Cloud Storage bucket and returns the public url
    to the new object.
    """
    _check_extension(filename, current_app.config['ALLOWED_EXTENSIONS'])
    filename = _safe_filename(filename)

    # build the name of the bucket
    bucket_name = os.getenv('GOOGLE_CLOUD_PROJECT') + '-covers'

    client = storage.Client()

    # create a bucket object
    bucket = client.bucket(bucket_name)

    # create an object in the bucket for the specified path
    blob = bucket.blob(filename)

    # upload the contents of the string into the object
    blob.upload_from_string(
        file_stream,
        content_type=content_type)

    # get the public URL for the object, which is used for storing a reference
    # to the image in the database and displaying the image in the app
    url = blob.public_url

    return url


def upload_image(img):
    """
    Upload the user-uploaded file to Cloud Storage and retrieve its
    publicly accessible URL.
    """
    if not img:
        return None

    public_url = upload_file(
        img.read(),
        img.filename,
        img.content_type
    )

    return public_url

EOF
```

### Paso 4: Modificar Plantillas para Mostrar Imágenes de Libros

Editar la Plantilla `form.html` añade las siguientes líneas encima del botón **Save** para permitir la carga de imágenes:

```
    <div class="form-group">
        <label for="image">Cover Image</label>
        <input type="file" name="image" id="image" class="form-control"/>
    </div>

    <div class="form-group hidden">
        <label for="imageUrl">Cover Image URL</label>
        <input type="text" name="imageUrl" id="imageUrl" value="{{book.imageUrl}}" class="form-control"/>
    </div>
```

Editar la Plantilla `view.html` añade el siguiente código después de `<div class="media">` para mostrar la imagen del libro:

```
    <div class="media-left">
        {% if book.imageUrl %}
        <img class="book-image" src="{{book.imageUrl}}" width="128" height="192" alt="book cover">
        {% else %}
        <img class="book-image" src="https://storage.googleapis.com/cloud-training/devapps-foundations/no-cover.png" width="128" height="192" alt="no book cover">
        {% endif %}
    </div>
```

Editar la Plantilla `list.html añade` el siguiente código después de `<a href="/books/{{book.id}}">` para mostrar las imágenes de los libros en la vista de lista:

```
        <div class="media-left">
            {% if book.imageUrl %}
            <img src="{{book.imageUrl}}" width="128" height="192" alt="book cover">
            {% else %}
            <img src="https://storage.googleapis.com/cloud-training/devapps-foundations/no-cover.png" width="128" height="192" alt="no book cover">
            {% endif %}
        </div>
```

### Paso 5: Modificar `main.py`

Añade lo siguiente después de la importación de `booksdb`:

```
import storage
```

Crear la Función de Carga de Imágenes, añade la siguiente función después de las líneas de importación:

```
def upload_image_file(img):
    """
    Upload the user-uploaded file to Cloud Storage and retrieve its
    publicly accessible URL.
    """
    if not img:
        return None

    public_url = storage.upload_file(
        img.read(),
        img.filename,
        img.content_type
    )

    current_app.logger.info(
        'Uploaded file %s as %s.', img.filename, public_url)

    return public_url
```

Añade la línea de extensiones permitidas a la sección `app.config.update`:

```
ALLOWED_EXTENSIONS=set(['png', 'jpg', 'jpeg', 'gif']),
```

Modificar las Funciones add() y edit(), añade el siguiente código después de `data = request.form.to_dict(flat=True)` en ambas funciones:

```

        image_url = upload_image_file(request.files.get('image'))

        # If an image was uploaded, update the data to point to the image.
        if image_url:
            data['imageUrl'] = image_url

```

### Paso 6: Probar la Aplicación Actualizada

Inicia la aplicación usando:

```
cd ~/bookshelf; ~/.local/bin/gunicorn -b :8080 main:app
```

**Previsualizar la Aplicación:**
1. En Cloud Shell, haz clic en **Vista previa en la web** y selecciona **Vista previa en el puerto 8080**.

**Probar la Carga de Imágenes**
1. Navega al libro **Hamlet**, edítalo y sube la imagen `hamlet.png`.
2. Verifica que la imagen se muestre correctamente.

**Revisar Cloud Storage:**
1. En la consola de Google Cloud, navega a **Cloud Storage > Buckets** y verifica que la imagen se haya subido.