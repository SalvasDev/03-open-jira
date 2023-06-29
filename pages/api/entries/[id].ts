import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { Entry, IEntry } from '@/models';

type Data =
  | { message: string }
  | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'El id no es válido' + id })
  }

  switch (req.method) {

    case 'GET':
      return getEntry(req, res);

    case 'PUT':
      return updateEntry(req, res);

    case 'DELETE':
      return deleteEntry(req, res);


    default:
      return res.status(400).json({ message: 'Método no existe' });
  }

}



///////////////////////////////////////////////////////////////////////////////////////////////

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const entryInDB = await Entry.findById(id);
  await db.disconnect();

  if (!entryInDB) {
    return res.status(400).json({ message: 'No hay entrada con ese ID:' + id })
  }
  return res.status(200).json(entryInDB);
}



///////////////////////////////////////////////////////////////////////////////////////////////

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: 'No hay entrada con ese ID:' + id })
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
    await db.disconnect();
    res.status(200).json(updatedEntry!);

  } catch (error: any) {
    console.log({ error });

    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }

}



///////////////////////////////////////////////////////////////////////////////////////////////

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  try {
    const entryInDB = await Entry.findByIdAndDelete(id);

    if (!entryInDB) {
      return res.status(404).json({ message: 'No se encontró la entrada con el ID: ' + id });
    }

    return res.status(200).json({ message: 'Entrada eliminada correctamente' });
  } catch (error) {
    // Manejar errores de base de datos u otros errores relacionados con la eliminación
    return res.status(500).json({ message: 'Error al eliminar la entrada' });
  } finally {
    await db.disconnect();
  }
}
