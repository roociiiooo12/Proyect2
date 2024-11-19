endpoints

Tendremos que definir las funciones específicas en los controladores (después de crear el CRUD básico)

En nuestra DB los usuarios deberían ser capaces de lo siguiente:
El paciente debe ser capaz de 

1. ver sus recetas (entrar en mi ID de paciente y traer mis recetas) HECHA
2. ver sus citas, (entrar en ID paciente y traer citas related to ID) HECHA
3. solicitar una cita (entrar en ID paciente y crear cita) HECHA
4. cancelar una cita (entrar en ID paciente y borrar cita) HECHA


El/la médico debería ser capaz de 

1. crear un paciente nuevo (entrar en ID de doctor y poder crear un usuario) HECHA

2. seleccionar a un paciente, (entre en ID de doctor y seleccionar ID de paciente) HECHA

3. ver a todos sus pacientes, (conseguir todos los pacientes relacionados con la ID del doctor en cuestión) HECHA

4. crear recetas de un paciente, (entrar en ID doctor, entrar en ID paciente y crear receta relacionada a ID paciente) HECHA

5. ver todas las recetas de un paciente (seleccionar el ID de un paciente perteneciente a un doctor en concreto y mostrar las recetas de este paciente) HECHA

6. ver todas sus citas (conseguir todas las citas relacionadas con el ID del doctor) HECHA



importante:

AL CREAR LAS NUEVAS ENDPOINTS, HAY QUE REFERENCIAR LA RELACIÓN ENTRE TABLAS A TRAVÉS DEL ALIAS