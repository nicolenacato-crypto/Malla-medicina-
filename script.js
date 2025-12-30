const contenedor = document.getElementById("contenedor");
let materias = [];
let semestres = {};
let estado = JSON.parse(localStorage.getItem("malla")) || {};

// Crear semestre
function crearSemestre() {
  const n = parseInt(document.getElementById("nuevoSemestre").value);
  if (!n || semestres[n]) return alert("Semestre inválido o ya existe.");
  const div = document.createElement("div");
  div.className = "semestre";
  div.dataset.semestre = n;
  div.innerHTML = `<h2>Semestre ${n}</h2>`;
  contenedor.appendChild(div);
  semestres[n] = div;
  actualizarSelectSemestres();
  guardar();
}

// Actualizar select de semestres
function actualizarSelectSemestres() {
  const sel = document.getElementById("semestreMateria");
  sel.innerHTML = "";
  Object.keys(semestres).sort((a,b)=>a-b).forEach(n => {
    const opt = document.createElement("option");
    opt.value = n;
    opt.textContent = `Semestre ${n}`;
    sel.appendChild(opt);
  });
}

// Añadir materia
function agregarMateriaUsuario() {
  const sem = document.getElementById("semestreMateria").value;
  const nombre = document.getElementById("nombreMateria").value;
  const codigo = document.getElementById("codigoMateria").value;
  const creditos = document.getElementById("creditosMateria").value;
  const reqs = document.getElementById("requisitosMateria").value.split(",").map(x=>x.trim()).filter(x=>x);

  if (!sem || !nombre || !codigo || !creditos) return alert("Completa todos los campos.");

  const divMateria = document.createElement("div");
  divMateria.className = "materia bloqueada";
  divMateria.dataset.id = codigo;
  divMateria.dataset.semestre = sem;
  divMateria.dataset.requisitos = reqs.join(",");

  divMateria.innerHTML = `
    <h3>${nombre}</h3>
    <small>${codigo} | ${creditos} créditos</small>
    <div class="progresos">
      <input class="p1" type="number" min="0" max="10" placeholder="P1">
      <input class="p2" type="number" min="0" max="10" placeholder="P2">
      <input class="p3" type="number" min="0" max="10" placeholder="P3">
    </div>
    <p>Nota final: <span>0.00</span></p>
  `;

  semestres[sem].appendChild(divMateria);
  materias.push(divMateria);
  asignarEventos(divMateria);
  actualizarBloqueos();
  guardar();
}

// Asignar eventos
function asignarEventos(materia) {
  const inputs = materia.querySelectorAll("input");
  inputs.forEach(input => input.addEventListener("input", ()=>calcularNota(materia)));
}

// Calcular nota
function calcularNota(materia) {
  const p1 = parseFloat(materia.querySelector(".p1").value)||0;
  const p2 = parseFloat(materia.querySelector(".p2").value)||0;
  const p3 = parseFloat(materia.querySelector(".p3").value)||0;
  const nota = p1*0.25 + p2*0.35 + p3*0.40;
  materia.querySelector("span").textContent = nota.toFixed(2);

  if (nota>=7){ materia.classList.add("aprobada"); materia.classList.remove("reprobada"); }
  else { materia.classList.add("reprobada"); materia.classList.remove("aprobada"); }

  actualizarBloqueos();
  actualizarProgreso();
  guardar();
}

// Bloqueo por prerrequisitos
function actualizarBloqueos() {
  materias.forEach(m => {
    const reqs = m.dataset.requisitos ? m.dataset.requisitos.split(",") : [];
    const ok = reqs.every(r => materias.find(x=>x.dataset.id===r)?.classList.contains("aprobada"));
    m.classList.toggle("bloqueada", !ok);
  });
}

// Guardar en localStorage
function guardar() {
  const data = {};
  materias.forEach(m => {
    data[m.dataset.id] = {
      p1: m.querySelector(".p1").value||0,
      p2: m.querySelector(".p2").value||0,
      p3: m.querySelector(".p3").value||0,
      requisitos: m.dataset.requisitos.split(","),
      aprobada: m.classList.contains("aprobada"),
      semestre: m.dataset.semestre
    };
  });
  localStorage.setItem("malla", JSON.stringify(data));
}

// Progreso total
function actualizarProgreso() {
  const total = materias.length;
  const aprobadas = materias.filter(m=>m.classList.contains("aprobada")).length;
  document.getElementById("progresoTotal").textContent = total?Math.round(aprobadas/total*100)+"%":"0%";
}

// Filtrar semestres
function mostrarSolo(n){ materias.forEach(m=>m.style.display=m.dataset.semestre==n?"block":"none"); }
function mostrarTodo(){ materias.forEach(m=>m.style.display="block"); }

window.onload = function() { 
  actualizarSelectSemestres();
};  
