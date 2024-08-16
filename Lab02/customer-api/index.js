const express = require('express');
const { Firestore } = require('@google-cloud/firestore');
const bodyParser = require('body-parser');
const cors = require('cors');

const firestore = new Firestore();
const COLLECTION = ''

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.post('/api/customers', async (req, res) => {
  try {
    const newItem = {
      ...req.body
    };
    const docRef = await firestore.collection(COLLECTION).doc(newItem.email);
   
    await docRef.set(newItem, { merge: true });
  
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    const snapshot = await firestore.collection(COLLECTION).get();
    const customers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).send(customers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/api/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await firestore.collection(COLLECTION).doc(id).get();
    if (!doc.exists) {
      res.status(404).send('Item no encontrado');
    } else {
      res.status(200).send({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put('/api/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await firestore.collection(COLLECTION).doc(id).update({
      ...req.body,
    });
    res.status(200).send('Item actualizado');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await firestore.collection(COLLECTION).doc(id).delete();
    res.status(200).send('Item eliminado');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
