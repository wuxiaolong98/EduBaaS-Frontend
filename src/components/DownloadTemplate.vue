<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>Index</el-breadcrumb-item>
      <el-breadcrumb-item>Template Management</el-breadcrumb-item>
      <el-breadcrumb-item>Download Template</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header">
        <span>Download an existing template</span>
      </div>
      <el-input placeholder="" v-model="quaryString" clearable>
        <el-button
          slot="append"
          @click="getTemplateList"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-table
        ref="templateListTable"
        :data="templateList"
        @current-change="tableSelectChange"
        highlight-current-row
        stripe
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="template_type" label="Type"></el-table-column>
        <el-table-column prop="entity_id" label="Contact"></el-table-column>
        <el-table-column
          prop="create_date"
          label="Modified date"
        ></el-table-column>
      </el-table>
      <!-- Pagination. -->
      <!-- Action methods. -->
      <el-row type="flex" justify="space-around">
        <el-col :span="8">
          <el-pagination
            @size-change="tableSizeChange"
            @current-change="tablePageChange"
            :current-page="pageNumber"
            :page-sizes="[5, 10, 15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="templateTotalNumber"
          >
          </el-pagination>
        </el-col>
        <el-col :span="8">
          <el-button
            @click="downloadSelectTemplate"
            :disabled="buttonDisabled"
            type="primary"
            icon="el-icon-download"
            >Download</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header">
        <span>Download blank template</span>
      </div>
      <el-form ref="uploadForm" label-width="auto">
        <el-form-item label="Template type">
          <el-select
            v-model="blankTemplateType"
            placeholder="Please select template type:"
          >
            <el-option label="Course template " value="1"></el-option>
            <el-option label="Test template" value="2"></el-option>
            <el-option label="Experiment template" value="3"></el-option>
            <el-option label="Exam template" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button @click="downloadBlankTemplate" type="text"
        >Confirm Selection / Download</el-button
      >
    </el-card>
  </div>
</template>

<script>
export default {
  // Initialize to get data.
  created: function() {
    this.getTemplateList();
  },
  data: function() {
    return {
      templateList: [],
      // Store the data of the selected row.
      templateTotalNumber: null,
      blankTemplateType: "1",
      tableSelectData: {},
      // Download only after selected.
      buttonDisabled: true,
      // Search by template name.
      quaryString: null,
      pageNumber: 1,
      pageSize: 5
    };
  },
  methods: {
    getTemplateList: function() {
      this.$http
        .get("/template/list", {
          quaryString: this.quaryString,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        })
        .then(response => {
          console.log(response);
          this.templateList = response.data.templateList;
          this.templateTotalNumber = response.data.templateTotalNumber;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // Download an existing template.
    downloadSelectTemplate: function() {
      console.log(this.tableSelectData);
    },
    // Download blank template.
    downloadBlankTemplate: function() {
      console.log(this.blankTemplateType);
    },

    tableSelectChange: function(row) {
      this.tableSelectData = row;
      if (row) {
        this.buttonDisabled = false;
      } else {
        this.buttonDisabled = true;
      }
    },
    tablePageChange: function(number) {
      this.pageNumber = number;
    },
    tableSizeChange: function(size) {
      this.pageSize = size;
    }
  },
  name: "DownloadTemplate"
};
</script>

<style scoped>
.el-card {
  margin-top: 15px;
}

.el-table {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
