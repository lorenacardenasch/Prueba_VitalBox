function patientData(sequelize, Datatypes)
{
    let a = 'Patients';
    let b = {
        id:{type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        name:{type: Datatypes.STRING(60)},
        typeDNI:{type: Datatypes.STRING(50)},
        dni:{type: Datatypes.STRING(60)},
        dateBirth:{type: Datatypes.DATEONLY},
        weight:{type: Datatypes.DECIMAL(10,0)},
        height:{type: Datatypes.DECIMAL(10,0)},
    }
    let c = {camelCase: false, timestamps: false, tableName: 'Patients'};
    const Patients= sequelize.define(a,b,c);
    return Patients
}
module.exports = patientData;