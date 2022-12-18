export const defineRole = (role) =>{
    switch(role){
        case 1: return "Администратор"
        case 2: return "Клиент"
        case 3: return "Руководитель коллектива"
        case 4: return "Организатор конкурса"
        default: return " "
    }
}