<template>
  <div id="app">
    <header>
      <h1>CV Builder</h1>
      <span>Éditeur · Aperçu · Export PDF</span>
    </header>

    <div class="workspace">
      <!-- FORM PANEL -->
      <div class="form-panel">

        <div class="section-title">Informations personnelles</div>

        <label>Prénom & Nom</label>
        <input v-model="cv.name" placeholder="Marie Dupont" />

        <label>Titre / Poste visé</label>
        <input v-model="cv.title" placeholder="Développeuse Full Stack" />

        <div class="row">
          <div>
            <label>Email</label>
            <input v-model="cv.email" />
          </div>
          <div>
            <label>Téléphone</label>
            <input v-model="cv.phone" />
          </div>
        </div>

        <label>Adresse</label>
        <input v-model="cv.address" />

        <label>LinkedIn</label>
        <input v-model="cv.linkedin" />

        <!-- Résumé -->
        <div class="section-title">Résumé professionnel</div>
        <textarea v-model="cv.summary"></textarea>

        <!-- Expériences -->
        <div class="section-title">Expériences</div>
        <div class="card-list">
          <div class="card-item" v-for="(exp, i) in cv.experiences" :key="i">
            <button class="remove-btn" @click="removeItem('experiences', i)">✕</button>
            <strong>{{ exp.role }}</strong>
            <span>{{ exp.company }}</span>
          </div>
        </div>

        <button class="add-btn" @click="openModal('exp')">
          + Ajouter une expérience
        </button>

        <!-- Export -->
        <button class="generate-btn" @click="generatePDF" :disabled="generating">
          {{ generating ? 'Génération…' : '⬇ Télécharger le PDF' }}
        </button>

        <div class="status-msg">{{ statusMsg }}</div>
      </div>

      <!-- PREVIEW -->
      <div class="preview-panel">
        <div id="cv-document">

          <div class="cv-sidebar">
            <div class="cv-avatar">{{ initials }}</div>
            <div class="cv-name">{{ cv.name }}</div>
            <div class="cv-title-role">{{ cv.title }}</div>
          </div>

          <div class="cv-main">
            <div v-if="cv.summary">
              <h3>Profil</h3>
              <p>{{ cv.summary }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

const cv = reactive({
  name: '',
  title: '',
  email: '',
  phone: '',
  address: '',
  linkedin: '',
  summary: '',
  experiences: []
})

const generating = ref(false)
const statusMsg = ref('')

const initials = computed(() => {
  if (!cv.name) return '?'
  return cv.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

function openModal(type) {
  cv.experiences.push({
    role: 'Nouveau poste',
    company: 'Entreprise'
  })
}

function removeItem(key, i) {
  cv[key].splice(i, 1)
}

async function generatePDF() {
  generating.value = true
  statusMsg.value = "Génération..."

  try {
    const el = document.getElementById("cv-document")
    const canvas = await html2canvas(el, { scale: 2 })

    const pdf = new jsPDF("p", "mm", "a4")
    const imgData = canvas.toDataURL("image/jpeg", 0.95)

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height / canvas.width) * pdfWidth

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight)
    pdf.save("CV.pdf")

    statusMsg.value = "PDF téléchargé !"
  } catch (e) {
    statusMsg.value = "Erreur !"
  }

  generating.value = false
}
</script>

<style scoped>

* {
  box-sizing: border-box;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  background: #f4f6f9;
  min-height: 100vh;
}

/* HEADER */
header {
  background: #1e293b;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  font-size: 1.4rem;
}

header span {
  font-size: 0.85rem;
  opacity: 0.8;
}

/* LAYOUT */
.workspace {
  display: grid;
  grid-template-columns: 400px 1fr;
  height: calc(100vh - 70px);
}

/* FORM PANEL */
.form-panel {
  background: white;
  padding: 2rem;
  overflow-y: auto;
  border-right: 1px solid #ddd;
}

.section-title {
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 0.7rem;
  color: #1e293b;
}

label {
  display: block;
  font-size: 0.8rem;
  margin-top: 0.8rem;
  margin-bottom: 0.2rem;
  color: #555;
}

input, textarea {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #2563eb;
}

textarea {
  min-height: 80px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* CARDS */
.card-item {
  background: #f1f5f9;
  padding: 0.7rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  position: relative;
}

.remove-btn {
  position: absolute;
  right: 8px;
  top: 5px;
  background: none;
  border: none;
  color: red;
  cursor: pointer;
}

/* BUTTONS */
.add-btn {
  margin-top: 0.8rem;
  width: 100%;
  padding: 0.6rem;
  background: #e2e8f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.add-btn:hover {
  background: #cbd5e1;
}

.generate-btn {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.9rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.generate-btn:hover {
  background: #1d4ed8;
}

.status-msg {
  margin-top: 0.8rem;
  text-align: center;
  font-size: 0.85rem;
  color: #2563eb;
}

/* PREVIEW PANEL */
.preview-panel {
  background: #e5e7eb;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  justify-content: center;
}

/* CV DOCUMENT */
#cv-document {
  background: white;
  width: 800px;
  min-height: 1100px;
  display: grid;
  grid-template-columns: 250px 1fr;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

/* SIDEBAR */
.cv-sidebar {
  background: #1e293b;
  color: white;
  padding: 2rem;
}

.cv-avatar {
  width: 80px;
  height: 80px;
  background: #2563eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.cv-name {
  font-size: 1.2rem;
  font-weight: bold;
}

.cv-title-role {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* MAIN */
.cv-main {
  padding: 2rem;
}

.cv-main h3 {
  margin-bottom: 0.5rem;
  border-bottom: 2px solid #2563eb;
  padding-bottom: 0.3rem;
}

</style>
