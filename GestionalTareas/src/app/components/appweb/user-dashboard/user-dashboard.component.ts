import { Component, AfterViewInit } from '@angular/core';
import Sortable from 'sortablejs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements AfterViewInit {

  ngAfterViewInit() {
    const taskContainer = document.querySelector('.task-container') as HTMLElement;
    const createBtn = document.getElementById('createListBtn') as HTMLButtonElement;
    let listCount = 1;

    // Hacer listas arrastrables
    new Sortable(taskContainer, {
      group: 'listas',
      animation: 150,
      ghostClass: 'sortable-ghost',
      handle: '.list-header',
      filter: '#createListBtn',
      onMove: (evt: any) => evt.related !== createBtn,
      onStart() {
        iniciarAutoScroll();
      },
      onEnd() {
        detenerAutoScroll();
      }
    });

  createBtn.addEventListener('click', () => {
    const newList = document.createElement('div');
    newList.classList.add('task-list');
    let taskCount = 1;

    newList.innerHTML = `
      <div class="list-header">
        <h3 class="list-name">Lista ${listCount}</h3>
        <button class="delete-list-btn" title="Eliminar lista">
          <i class='bx bx-x'></i>
        </button>
      </div>
      <div class="task-items"></div>
      <button class="add-task-btn">Crear nueva tarea</button>
    `;

    taskContainer.insertBefore(newList, createBtn);
    newList.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });

    const addTaskBtn = newList.querySelector('.add-task-btn') as HTMLButtonElement;
    const taskItemsContainer = newList.querySelector('.task-items') as HTMLElement;
    const deleteListBtn = newList.querySelector('.delete-list-btn') as HTMLButtonElement;
    const listName = newList.querySelector('.list-name') as HTMLElement;

    listCount++;

    listName.addEventListener('dblclick', () => {
      listName.contentEditable = 'true';
      listName.focus();
    });

    listName.addEventListener('blur', () => {
      listName.contentEditable = 'false';
    });

    inicializarDragEnTareas(taskItemsContainer);

    addTaskBtn.addEventListener('click', () => {
      const task = document.createElement('div');
      task.classList.add('task-item');
      task.innerHTML = `
        <span class="task-text">Tarea ${taskCount}</span>
        <button class="delete-task-btn" title="Eliminar tarea">
          <i class='bx bx-trash'></i>
        </button>
      `;
      taskItemsContainer.appendChild(task);
      task.scrollIntoView({ behavior: 'smooth', block: 'end' });
      taskCount++;

      const taskText = task.querySelector('.task-text') as HTMLElement;
      taskText.addEventListener('dblclick', () => {
        taskText.contentEditable = 'true';
        taskText.focus();
      });

      taskText.addEventListener('blur', () => {
        taskText.contentEditable = 'false';
      });

      const deleteTaskBtn = task.querySelector('.delete-task-btn') as HTMLButtonElement;
      deleteTaskBtn.addEventListener('click', () => {
        task.remove();
      });

      ajustarTamañoContenedor(newList);
    });

    deleteListBtn.addEventListener('click', () => {
      newList.remove();
    });

    aplicarMascaraScroll(taskItemsContainer);
  });

// Definir tipo para mousePos
let mousePos: { clientX: number; clientY: number } = { clientX: 0, clientY: 0 };

// Definir tipo para autoScrollInterval
let autoScrollInterval: ReturnType<typeof setInterval> | null = null;

// Autoscroll personalizado
function iniciarAutoScroll(): void {
  if (autoScrollInterval) return;

  autoScrollInterval = setInterval(() => {
    const edgeMargin = 100;
    const scrollSpeed = 25;
    const { clientX, clientY } = mousePos;
    const { innerWidth, innerHeight } = window;

    if (clientX < edgeMargin) {
      window.scrollBy({ left: -scrollSpeed, behavior: 'auto' });
    } else if (clientX > innerWidth - edgeMargin) {
      window.scrollBy({ left: scrollSpeed, behavior: 'auto' });
    }

    if (clientY < edgeMargin) {
      window.scrollBy({ top: -scrollSpeed, behavior: 'auto' });
    } else if (clientY > innerHeight - edgeMargin) {
      window.scrollBy({ top: scrollSpeed, behavior: 'auto' });
    }
  }, 30);
}

function detenerAutoScroll(): void {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
}

document.addEventListener('mousemove', (e: MouseEvent) => {
  mousePos.clientX = e.clientX;
  mousePos.clientY = e.clientY;
});

// Definir tipo para el contenedor
function inicializarDragEnTareas(container: HTMLElement): void {
  new Sortable(container, {
    group: 'tareas',
    animation: 150,
    ghostClass: 'sortable-ghost',
    handle: '.task-text',
    onStart(evt: any): void {
      const taskText = evt.item.querySelector('.task-text') as HTMLElement;
      taskText.contentEditable = 'false';
      iniciarAutoScroll();
    },
    onEnd(evt: any): void {
      const taskText = evt.item.querySelector('.task-text') as HTMLElement;
      taskText.contentEditable = 'true';
      detenerAutoScroll();
    }
  });
}

function ajustarTamañoContenedor(newList: HTMLElement): void {
  const taskItemsContainer = newList.querySelector('.task-items') as HTMLElement;
  const totalTareas = taskItemsContainer.querySelectorAll('.task-item').length;

  if (totalTareas >= 5) {
    taskItemsContainer.style.paddingBottom = '40px';
  } else {
    taskItemsContainer.style.paddingBottom = '10px';
  }
}

function aplicarMascaraScroll(container: HTMLElement): void {
  const updateMask = (): void => {
    const scrollHeight = container.scrollHeight;
    const offsetHeight = container.offsetHeight;
    const scrollTop = container.scrollTop;
    const maxScroll = scrollHeight - offsetHeight;

    if (scrollHeight <= offsetHeight + 1) {
      container.style.webkitMaskImage = 'none';
      container.style.maskImage = 'none';
      return;
    }

    if (scrollTop >= maxScroll - 1) {
      container.style.webkitMaskImage = 'none';
      container.style.maskImage = 'none';
    } else {
      const scrollRatio = scrollTop / maxScroll;
      const fadeHeight = 100;
      const stopPercent = Math.max(0, 100 - (fadeHeight / offsetHeight) * 100);
      const opacity = Math.min(100, stopPercent + (scrollRatio * (100 - stopPercent)));
      const gradient = `linear-gradient(to top, transparent 0%, black ${opacity}%)`;
      container.style.webkitMaskImage = gradient;
      container.style.maskImage = gradient;
    }
  };

  updateMask();
  container.addEventListener('scroll', updateMask);
  window.addEventListener('resize', updateMask);
}



// Mostrar el contenedor de notas
const notepadBtn = document.getElementById('notepadBtn') as HTMLElement;
const notepadContainer = document.getElementById('notepadContainer') as HTMLElement;
const closeNotepadBtn = document.getElementById('closeNotepadBtn') as HTMLElement;
const saveNoteBtn = document.getElementById('saveNoteBtn') as HTMLElement;
const notesList = document.getElementById('notesList') as HTMLElement;
const notepadTextArea = document.getElementById('notepadTextArea') as HTMLTextAreaElement;

// Mostrar el contenedor de notas
notepadBtn.addEventListener('click', () => {
  notepadContainer.style.display = 'block';
});

// Cerrar el contenedor de notas
closeNotepadBtn.addEventListener('click', () => {
  notepadContainer.style.display = 'none';
});

// Guardar una nueva nota
saveNoteBtn.addEventListener('click', () => {
  const noteText = notepadTextArea.value.trim();
  if (noteText === "") return;

  const existingNotes = notesList.getElementsByClassName('note-item');
  if (existingNotes.length >= 10) {  // Límite de 10 notas
    alert("Ya has alcanzado el límite de 10 notas.");
    return;
  }

  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note-item');

  const colorTag = document.createElement('div');
  colorTag.classList.add('note-color-tag');
  const defaultColor = "#223042";  // Color predeterminado
  colorTag.style.backgroundColor = defaultColor;
  noteDiv.dataset['color'] = defaultColor;

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('note-content');

  const titleElem = document.createElement('div');
  titleElem.classList.add('note-title');
  titleElem.textContent = noteText;

  const infoElem = document.createElement('div');
  infoElem.classList.add('note-info');
  infoElem.textContent = ''; // Información vacía por defecto

  const categoryElem = document.createElement('div');
  categoryElem.classList.add('note-category');
  categoryElem.textContent = 'Normal';  // Categoría por defecto

  const footer = document.createElement('div');
  footer.classList.add('note-footer');

  const dateElem = document.createElement('span');
  dateElem.classList.add('note-date');
  dateElem.textContent = ''; // Fecha por defecto

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.classList.add('close-btn');

  deleteBtn.addEventListener('click', () => {
    noteDiv.remove();
  });

  // Añadir evento de doble clic para abrir el modal
  (noteDiv as HTMLElement).addEventListener('dblclick', () => {
    openEditModal(noteDiv);
  });
  

  contentWrapper.appendChild(titleElem);
  contentWrapper.appendChild(infoElem);
  contentWrapper.appendChild(categoryElem);  // Agregamos la categoría aquí
  footer.appendChild(deleteBtn);
  footer.appendChild(dateElem);

  noteDiv.appendChild(colorTag);
  noteDiv.appendChild(contentWrapper);
  noteDiv.appendChild(footer);

  notesList.appendChild(noteDiv);
  notepadTextArea.value = '';
});

// Delegación de eventos para el doble clic en la lista de notas
notesList.addEventListener('dblclick', (e: Event) => {
  const noteDiv = (e.target as HTMLElement).closest('.note-item');
  if (noteDiv) {
    openEditModal(noteDiv as HTMLElement); // Asegúrate de hacer cast a HTMLElement
  }
});

// Abrir modal de edición
function openEditModal(noteDiv: HTMLElement): void {
  const title = noteDiv.querySelector('.note-title')?.textContent ?? '';
  const info = noteDiv.querySelector('.note-info')?.textContent ?? '';
  const color = noteDiv.dataset['color'] ?? "#223042"; // Acceso con corchetes
  const date = noteDiv.dataset['date'] ?? ''; // Acceso con corchetes
  const category = noteDiv.querySelector('.note-category')?.textContent ?? 'Normal';  // Obtener categoría

  // Acceder a los campos del modal
  const editTaskTitle = document.getElementById('editTaskTitle') as HTMLInputElement;
  const editTaskInfo = document.getElementById('editTaskInfo') as HTMLTextAreaElement;
  const editTaskColor = document.getElementById('editTaskColor') as HTMLInputElement;
  const editTaskDueDate = document.getElementById('editTaskDueDate') as HTMLInputElement;
  const editTaskCategory = document.getElementById('editTaskCategory') as HTMLSelectElement;

  // Rellenar los campos del modal con los valores
  editTaskTitle.value = title;
  editTaskInfo.value = info;
  editTaskColor.value = color;
  editTaskDueDate.value = date;
  editTaskCategory.value = category;

  // Mostrar el modal
  const editTaskModal = document.getElementById('editTaskModal') as HTMLElement;
  if (editTaskModal) editTaskModal.style.display = 'block';

  // Clonación del botón de guardar
  const saveBtn = document.getElementById('saveEditedTaskBtn') as HTMLElement;
  if (saveBtn) {
    const newSaveBtn = saveBtn.cloneNode(true) as HTMLElement;
    saveBtn.parentNode?.replaceChild(newSaveBtn, saveBtn);

    newSaveBtn.addEventListener('click', function () {
      const newTitle = editTaskTitle.value;
      const newInfo = editTaskInfo.value;
      const newColor = editTaskColor.value;
      const newDate = editTaskDueDate.value;
      const newCategory = editTaskCategory.value;

      // Actualizar los elementos de la nota
      const noteTitle = noteDiv.querySelector('.note-title');
      const noteInfo = noteDiv.querySelector('.note-info');
      const noteDate = noteDiv.querySelector('.note-date');
      const noteColorTag = noteDiv.querySelector('.note-color-tag');
      const noteCategory = noteDiv.querySelector('.note-category');

      if (noteTitle) noteTitle.textContent = newTitle;
      if (noteInfo) noteInfo.textContent = newInfo;
      if (noteDate) noteDate.textContent = newDate ? `Vence: ${newDate}` : '';
      if (noteColorTag instanceof HTMLElement) {
        noteColorTag.style.backgroundColor = newColor;
      }
      if (noteCategory) noteCategory.textContent = newCategory;

      // Actualizar los datos en el dataset
      noteDiv.dataset['info'] = newInfo;
      noteDiv.dataset['color'] = newColor;
      noteDiv.dataset['date'] = newDate;

      // Cerrar el modal
      if (editTaskModal) editTaskModal.style.display = 'none';
    });
  }

  // Cerrar el modal
  const closeEditModalBtn = document.getElementById('closeEditModalBtn') as HTMLElement;
  closeEditModalBtn.addEventListener('click', function () {
    if (editTaskModal) editTaskModal.style.display = 'none';
  });
}


// Marcar tarea como completada (con check y color verde)
document.addEventListener('change', function (e: Event) {
  const target = e.target as HTMLInputElement;
  if (target && target.matches('input[type="checkbox"]')) {
    const noteDiv = target.closest('.note-item') as HTMLElement;
    if (noteDiv) {
      target.classList.toggle('completed', target.checked);
      const noteTitle = noteDiv.querySelector('.note-title');
      if (noteTitle instanceof HTMLElement) {
        if (target.checked) {
          noteTitle.style.textDecoration = 'line-through';  // Tachar el título
        } else {
          noteTitle.style.textDecoration = 'none';  // Eliminar tachado
        }
      }
      
    }
  }
});

// Hacer que el texto largo se recorte con "..."
document.querySelectorAll('.note-info').forEach(function (infoElem) {
  const noteInfoElem = infoElem as HTMLElement;  // Hacemos cast explícito a HTMLElement
  noteInfoElem.style.whiteSpace = 'nowrap';
  noteInfoElem.style.overflow = 'hidden';
  noteInfoElem.style.textOverflow = 'ellipsis';
  noteInfoElem.style.maxWidth = '250px';  // Limitar el ancho
});


// Hacer el contenedor arrastrable
const notepadContainerElement = document.getElementById('notepadContainer') as HTMLElement;
let isDragging = false;
let offsetX: number, offsetY: number;


notepadContainer.addEventListener('mousedown', function (e: MouseEvent) {
  isDragging = true;
  offsetX = e.clientX - notepadContainer.offsetLeft;
  offsetY = e.clientY - notepadContainer.offsetTop;
});

document.addEventListener('mousemove', function (e: MouseEvent) {
  if (isDragging) {
    notepadContainer.style.left = e.clientX - offsetX + 'px';
    notepadContainer.style.top = e.clientY - offsetY + 'px';
  }
});

document.addEventListener('mouseup', function () {
  isDragging = false;
});
  }}
