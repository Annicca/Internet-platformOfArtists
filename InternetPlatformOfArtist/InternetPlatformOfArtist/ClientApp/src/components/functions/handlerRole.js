import react from "react";

export const handlerRole = ({listRole,nameRole})=>{
    listRole.map(r =>{
        if(r.name == nameRole){
            return r.idRole
        }
    })
}

searchByIdRole = (listRole,id) => {
    listRole.map(r =>{
        if(r.idRole == id){
            return r.nameRole
        }
    });
};