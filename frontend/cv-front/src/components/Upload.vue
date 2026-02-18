<template>
  <div>
    <input type="file" @change="handleFile" />
    <button @click="uploadFile">Upload</button>
  </div>
</template>

<script setup>
import axios from "axios"
import { ref } from "vue"

const selectedFile = ref(null);

const handleFile= event =>{
    selectedFile.value = event.target.files[0]
}

const uploadFile= async () =>{
    if(!selectedFile.value){
        alert("Please select a file first.")
        return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile.value)

    try{
        const response = await axios.post("/api/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        alert("File uploaded successfully!")
    } catch (error) {
        alert("Error uploading file: " + error.message)
    }

}

</script>