const express = require('express');
const router = express.Router();

const pool = require('../database');

//Cliente
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
    const clientes = await pool.query('SELECT * FROM cliente ORDER BY nombre');
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

//Pedido
router.get('/add_ped', (req, res) => {
    res.render('links/add_ped');
});

router.post('/add_ped', async (req, res)=> {
    const {id_pedido, pedido_local, pedido_domicilio, cliente_id, mesero_id} = req.body;
    const newLink = {
        id_pedido,
        pedido_local,
        pedido_domicilio,
        cliente_id,
        mesero_id
    };
    await pool.query('INSERT INTO pedido set ?', [newLink]);
    console.log(newLink);
    res.redirect('/links/show_ped');
});

router.get('/show_ped', async (req, res)=>{
    const pedidos = await pool.query('SELECT * FROM pedido ORDER BY id_pedido');
    res.render('links/list_ped', {pedidos});
});

router.get('/delete_ped/:id_pedido', async(req, res)=> {
    const {id_pedido} = req.params;
    await pool.query('DELETE FROM pedido WHERE id_pedido = ?', [id_pedido]);
    res.redirect('/links/show_ped');
});

router.get('/edit_ped/:id_pedido', async(req, res)=>{
    const{id_pedido} = req.params;
    const pedidos = await pool.query('SELECT * FROM pedido WHERE id_pedido = ?', [id_pedido]);
    res.render('links/edit_ped', {pedido: pedidos[0]});
});

router.post('/edit_ped/:id_pedido', async(req, res)=>{
    const {id_pedido} = req.params;
    const {pedido_local, pedido_domicilio, cliente_id, mesero_id} = req.body;
    const newCliente = {
        pedido_local,
        pedido_domicilio,
        cliente_id,
        mesero_id
    };
    
    await pool.query('UPDATE pedido set ? WHERE id_pedido = ?', [newCliente, id_pedido] );

    res.redirect('/links/show_ped');
});

//empleado
router.get('/add_emp', (req, res) => {
    res.render('links/add_emp');
});

router.post('/add_emp', async (req, res)=> {
    const {cedula, sueldo, chef, mesero, domiciliario, pedido_id} = req.body;
    const newLink = {
        cedula,
        sueldo,
        chef,
        mesero,
        domiciliario,
        pedido_id
    };
    await pool.query('INSERT INTO empleado set ?', [newLink]);
    console.log(newLink);
    res.redirect('/links/show_emp');
});

router.get('/show_emp', async (req, res)=>{
    const empleados = await pool.query('SELECT * FROM empleado ORDER BY cedula');
    res.render('links/list_emp', {empleados});
});

router.get('/delete_emp/:cedula', async(req, res)=> {
    const {cedula} = req.params;
    await pool.query('DELETE FROM empleado WHERE cedula = ?', [cedula]);
    res.redirect('/links/show_emp');
});

router.get('/edit_emp/:cedula', async(req, res)=>{
    const{cedula} = req.params;
    const empleados = await pool.query('SELECT * FROM empleado WHERE cedula = ?', [cedula]);
    res.render('links/edit_emp', {empleado: empleados[0]});
});

router.post('/edit_emp/:cedula', async(req, res)=>{
    const {cedula} = req.params;
    const {sueldo, chef, mesero, domiciliario, pedido_id} = req.body;
    const newCliente = {
        sueldo,
        chef,
        mesero,
        domiciliario,
        pedido_id
    };
    
    await pool.query('UPDATE empleado set ? WHERE cedula = ?', [newCliente, cedula] );

    res.redirect('/links/show_emp');
});

module.exports = router; 