      const {Model } = require('sequelize');

      module.exports = (sequelize, DataType)=>{
        class User extends Model{
            static associat (models){

            }


        }

        User.init({
            id:{
                type: DataType.INTEGER,
                primaryKey: true
            },
            first_name:{
               type:DataType.STRING,
               allowNull:false 
            },
            last_name:{
                type:DataType.STRING
            },
            email:{
                type:DataType.STRING,
                allowNull:false
            },
            password:{
                type:DataType.STRING,
                allowNull:false
            }
            
        },{
            sequelize,
            modelName:"User",
            tableName:"users",
            timestamps:false
        })

        return User;
      }