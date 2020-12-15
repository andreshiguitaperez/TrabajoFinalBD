const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res)=> {
    const {cedula, nombre, fecha_cumple, telefono, direccion, pedido_id} = req.body;
    const newLink = {
        cedula,
        nombre,
        fecha_cumple,
        telefono,
        direccion,
        pedido_id
    };
    await pool.query('INSERT INTO cliente set ?', [newLink]);
    console.log(newLink);
    res.redirect('/links/show');
});

router.get('/show', async (req, res)=>{
    const clientes = await pool.query('SELECT * FROM cliente');
    res.render('links/list_cli', {clientes});
});

router.get('/specific_cl', (req, res) => {
    res.render('links/specific_cli');
});

router.get('/specific/', async(req, res)=>{
    const cedula = req.query.cedula;
    const cliente = await pool.query('SELECT * FROM cliente WHERE cedula = ?', [cedula]);
    console.log(req.query.cedula);
    res.render('links/specific_cli', {cliente: cliente[0]});
});


router.get('/delete/:cedula', async(req, res)=> {
    const {cedula} = req.params;
    await pool.query('DELETE FROM cliente WHERE cedula = ?', [cedula]);
    res.redirect('/links/show');
});

router.get('/edit/:cedula', async(req, res)=>{
    const{cedula} = req.params;
    const clientes = await pool.query('SELECT * FROM cliente WHERE cedula = ?', [cedula]);
    res.render('links/edit_cli', {cliente: clientes[0]});
});

router.post('/edit/:cedula', async(req, res)=>{
    const {cedula} = req.params;
    const {nombre, fecha_cumple, telefono, direccion, pedido_id} = req.body;
    const newCliente = {
        nombre,
        fecha_cumple,
        telefono,
        direccion,
        pedido_id
    };
    
    await pool.query('UPDATE cliente set ? WHERE cedula = ?', [newCliente, cedula] );

    res.redirect('/links/show');
});

module.exports = router; 