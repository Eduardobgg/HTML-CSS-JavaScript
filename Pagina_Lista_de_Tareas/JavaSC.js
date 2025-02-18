const InputTareas = document.getElementById('InputTareas');
const BotonAceptar = document.getElementById('BotonAceptar');
const Contenedor = document.getElementById('Contenedor');
const contador= document.getElementById('contador') //llamamos a mi elemento contador
let TareasCompletadas= 0; //Declaramos la variable let para contar las tareas completadas

// Función para agregar una nueva tarea
function addTask() {
    //taskInput.value obtiene el valor actual que el usuario ha escrito en el campo de texto taskInput.
    //trim() elimina los espacios en blanco al principio y al final del texto.
    const taskName = InputTareas.value.trim();

    if (taskName !== '') { //verifica si taskName no está vacío.
        // Crear un nuevo elemento de lista
        const taskItem = document.createElement('li'); //Crea un nuevo elemento de lista
        taskItem.className = 'task-item'; //Asigna una clase CSS task-item al nuevo elemento li. Esto te permite aplicar estilos específicos a este elemento



        // Creo mi checkbox para marcar las tareas como Completadas 
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'; //Hace que se vea el cuadro del checkbox en el navegador
        checkbox.className = 'MiCheckBox'; //Clase para darle diseño en CSS

        // Evento para marcar la tarea como completada
        checkbox.addEventListener('click', function() { //Aplico el evento para que se marque como completada la tarea
        taskItem.classList.toggle('Completada'); // https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle: toggle es un método de classList que alterna, añade o elimina una clase específica
        //Condición para ver si la tarea se completo, entonces se actualiza en mi contador
        if(taskItem.classList.contains('Completada')){ //contains(): revisa si una clase específica está presente en esa lista.
            TareasCompletadas++; //Si la tarea se marca como completada entonces se agrega 1 al contador
        } else{
            TareasCompletadas--; //Si se desmarca la tarea completada se le resta al contador 
        }
        contador.textContent = TareasCompletadas; //Aplica el cambio de incremento o decremento de tareas Completadas
        });
        // Fin de mi CheckBox

    



        // Crear un span para el nombre de la tarea
        const taskNameSpan = document.createElement('span');
        taskNameSpan.className = 'task-name';
        taskNameSpan.textContent = taskName; //textContent asigna el texto del nombre de la tarea a este span.

        // Botón de eliminar tarea
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm'; //Añade una clases al botón.
        //btn-danger: Clase que aplica un estilo de color rojo, comúnmente utilizado para botones de advertencia o eliminación. btn-sm: Clase que reduce el tamaño del botón, haciéndolo más pequeño. 
        deleteBtn.textContent = 'Eliminar'; //Establece el texto que se mostrará dentro del botón.



        // Agregar el evento de eliminación al botón
        deleteBtn.addEventListener('click', function() { //Asocia una función a un evento específico (en este caso, el evento es click), cada cada vez que se haga clic en el botón, se ejecutará la función.
            // Condición para que al eliminar una tarea que este marcada como completada, tambien se elimine del contador de Tareas
            if (taskItem.classList.contains('Completada')) {// Si la tarea se marca como completada al momento de que se elimina la tarea
                TareasCompletadas--; // Entonces se le resta 1 al contador
                contador.textContent = TareasCompletadas; // se actualiza la info del contador
            }
            Contenedor.removeChild(taskItem); //Busca el elemento taskItem dentro del Contenedor y lo elimina del DOM.
        });

        // Añadir el nombre y el botón de eliminación al elemento de lista
        //appendChild se usa para agregar un nuevo elemento dentro de otro.
        taskItem.appendChild(checkbox); //Ahora agregamos el checkbox
        taskItem.appendChild(taskNameSpan); //Primero guardamos el span dentro de taskItem
        taskItem.appendChild(deleteBtn); //Despues lo mismo pero con el boton para eliminar las tareas

        // Añadir el nuevo elemento a la lista de tareas
        Contenedor.appendChild(taskItem); //Ahora las funciones se guardan dentro del taskItem ahora los guardamos dentro del contenedor

        // Limpiar el campo de entrada después de agregar la tarea, dejando el campo vacío para la siguiente tarea.
        InputTareas.value = '';
    }
}

// Agregar una tarea al hacer clic en el botón
BotonAceptar.addEventListener('click', addTask);

// También agregar la tarea al presionar Enter
InputTareas.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});


