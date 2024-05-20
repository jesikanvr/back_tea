const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { sequelize } = require("../../database/conf");
const { generateJWT } = require("../../helpers/generate-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    console.log('REQ', email, password)
  //verificar si el email existe y verificar si el usuario esta activo
    //const user = await User.findOne({ where: { email } });
    const resp = await sequelize.query(
      `select * from user_credentials('${email}');`
    );
    const DATA = resp[0][0]['user_credentials']
    if (DATA?.status === 'error') {
      return res.json({ status: 400, error: "User or password not valid" });
    }
    //verificar si la contrasenna es correcta
    const validPassword = bcryptjs.compareSync(password, DATA.password);
    if (!validPassword) {
      return res.json({ status: 400, error: "User or password not valid" });
    }
    //generar JWT
    const token = await generateJWT(DATA.id); 

    const {id, name, img, role} = DATA
    //respuesta
    return res.json({ status: 200, user: {id, name, email, img, role}, token });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, error: "Internal error" });
  }
};


const register = async (req = request, res = response) => {
/*   const { name, email, password } = req.body;
  const user = new User({ name, email, password, role: "USER" });

  //Encriptar la contrasenna
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //guardar en la db
  await user.save();

  //generar JWT
  const token = await generateJWT(user.id); */

  //respuesta al front
  res.json({ status: 200, user:{}, token:{} });
};

module.exports = {
  login,
  register,
};
