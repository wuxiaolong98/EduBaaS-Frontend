<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>Index</el-breadcrumb-item>
      <el-breadcrumb-item>Template Management</el-breadcrumb-item>
      <el-breadcrumb-item>Upload Template</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="uploadForm" :model="uploadForm" label-width="auto">
      <el-form-item label="Template type">
        <el-select
          v-model="uploadForm.type"
          placeholder="Please select template type:"
        >
          <el-option label="Course template " value="1"></el-option>
          <el-option label="Test template" value="2"></el-option>
          <el-option label="Experiment template" value="3"></el-option>
          <el-option label="Exam template" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="New template">
        <el-switch v-model="uploadForm.isNew"></el-switch>
      </el-form-item>
      <el-form-item label="Upload area">
        <el-upload
          action=""
          :http-request="uploadFormSubmit"
          ref="uploadFormUpload"
          accept=".csv,.xls,.xlsx,.doc,.docx,.md"
          :limit="1"
          :auto-upload="false"
          :on-exceed="uploadFormExceed"
          :on-success="uploadFormSuccess"
          :on-error="uploadFormError"
          drag
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            Drag the file here, or <em>Click to upload</em>.
          </div>
          <div class="el-upload__tip" slot="tip">
            Make sure the file format is correct before uploading.
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="Operation">
        <el-button type="primary" plain @click="startSubmit"
          >Confirm Upload</el-button
        >
        <el-button type="danger" plain @click="uploadFormClear"
          >Clear File List</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      uploadForm: {
        type: "1",
        isNew: false
      }
    };
  },
  methods: {
    startSubmit() {
      this.$refs.uploadFormUpload.submit();
    },
    // Upload the entire form.
    uploadFormSubmit: function(files) {
      // console.log("File is :", files);
      let formData = new FormData();
      formData.append("template_type", "6," + this.uploadForm.type);
      formData.append("template", files);
      console.log(formData.get("template"));

      this.$http
        .post("/template/importTemplate", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response);
          this.$refs.uploadFormUpload.clearFiles();
          this.$refs.uploadForm.resetFields();
        })
        .catch(error => {
          console.log(error);
        });
    },
    uploadFormClear() {
      this.$refs.uploadFormUpload.clearFiles();
      this.$refs.uploadForm.resetFields();
    },
    uploadFormExceed() {
      this.$message.warning("A single transfer is limited to one file.");
    },
    uploadFormSuccess() {
      this.$message.success("File uploaded successfully.");
    },
    uploadFormError() {
      console.log(this.$refs.uploadForm);
      this.$message.error("File upload failed.");
    }
  },
  name: "UploadTemplate"
};
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}
</style>
