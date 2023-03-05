const express = require("express");
const router = express.Router();
const Medicina = require('../models/Medicina');
const { route } = require("./rutas");

router.get('/', async (req, res) => {
  
  try{
    const arrayMedicinaDB = await Medicina.find();
    console.log(arrayMedicinaDB);
    res.render("medicina", {
      arrayMedicina: arrayMedicinaDB
      })
  } catch(error){
      console.error(error)
  }
});

router.post('/', async (req, res) => {
  const body = req.body

  console.log(body)
  
  try{
    const MedicinaDB = new Medicina(body)

    await MedicinaDB.save()
    res.redirect('/medicina')
  } catch(error){
      console.error(error)
  }
});

router.get('/crear',(req,res)=>{
  res.render('crear')
});

router.get('/:id', async(req,res)=>{
  const id = req.params.id
  //param.id = pokemon._id

  try{
    const MedicinaDB = await Medicina.findOne({ _id:id})

    console.log(MedicinaDB)
    res.render('detalle',{
      medicina:MedicinaDB,
      error:false
    })
  }catch(error){
    console.log('Se ha producido un error',error)
    res.render('detalle',{
      error:true,
      mensaje:'Medicina no encontrada!'
    })
  }
});

router.delete('/:id', async(req,res)=>{
  const id = req.params.id;
  console.log('_id desde backend', id)
  try{
    const medicinaDB = await Medicina.findByIdAndDelete({ _id:id });
    console.log(medicinaDB)

    if (!medicinaDB) {
      res.json({
        estado:false,
        mensaje:"No se puede eliminar el Pokemon."
      })
    }else{
      res.json({
        estado:true,
        mensaje:"Pokemon eliminado."
      })
    }
  }catch(error){
    console.log(error)
  }
});

router.put('/:id', async(req,res)=>{
  const id = req.params.id;
  const body = req.body;
  console.log(id)
  console.log('body', body)
  try{
    const medicinaDB = await Medicina.findByIdAndUpdate( id, body, {useFindAndModify:false }
      )
    console.log(medicinaDB)
      res.json({
        estado:true,
        mensaje:"Medicina editada."
      })

  }catch(error){
    console.log(error)
    res.json({
      estado:false,
      mensaje:'Problema al editar la medicina'
    })
  }
});

module.exports = router;
