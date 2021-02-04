<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>Index</el-breadcrumb-item>
      <el-breadcrumb-item>User Management</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header">
        <span>User information management</span>
      </div>
      <el-input placeholder="" v-model="quaryString" clearable>
        <el-button
          slot="append"
          @click="getUserList"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-table
        ref="userListTable"
        :data="userList"
        @current-change="tableSelectChange"
        highlight-current-row
        stripe
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="nickname" label="Username"></el-table-column>
        <el-table-column prop="name" label="Real Name"></el-table-column>
        <el-table-column prop="tel" label="Phone Number"></el-table-column>
        <el-table-column prop="email" label="E-mail"></el-table-column>
        <el-table-column prop="role" label="Role"></el-table-column>
      </el-table>
      <!-- Pagination. -->
      <!-- Action methods. -->
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-pagination
            @size-change="tableSizeChange"
            @current-change="tablePageChange"
            :current-page="pageNumber"
            :page-sizes="[5, 10, 15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userTotalNumber"
          >
          </el-pagination>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="3">
          <el-button @click="addUser" type="primary" icon="el-icon-plus"
            >Add</el-button
          >
        </el-col>
        <el-col :span="3">
          <el-button
            @click="deleteUser"
            :disabled="buttonDisabled"
            type="warning"
            icon="el-icon-delete"
            >Delete</el-button
          >
        </el-col>
        <el-col :span="3">
          <el-button
            @click="editUser"
            :disabled="buttonDisabled"
            type="danger"
            icon="el-icon-edit"
            >Edit</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <!-- Add user dialog. -->
    <el-dialog
      title="Add a new user"
      :visible.sync="addUserVisible"
      width="50%"
    >
      <el-form
        ref="addUserForm"
        :model="addUserForm"
        :rules="addUserFormRules"
        status-icon
        label-width="125px"
      >
        <el-form-item label="Username" prop="username">
          <el-input
            type="text"
            v-model="addUserForm.username"
            autosize
            autocomplete="off"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- The Prop Value must be in the v-model defines. -->
        <el-form-item label="Real Name" prop="realName">
          <el-input
            type="text"
            v-model="addUserForm.realName"
            autosize
            autocomplete="off"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item label="E-mail" prop="email">
          <el-input
            type="text"
            v-model="addUserForm.email"
            autosize
            autocomplete="off"
            prefix-icon="el-icon-message"
          ></el-input>
        </el-form-item>
        <el-form-item label="Phone Number" prop="phoneNumber">
          <el-input
            type="text"
            v-model.number="addUserForm.phoneNumber"
            autosize
            autocomplete="off"
            prefix-icon="el-icon-phone-outline"
          ></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            type="password"
            v-model="addUserForm.password"
            autosize
            autocomplete="off"
            prefix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item label="Repeat" prop="repeatPassword">
          <el-input
            type="password"
            v-model="addUserForm.repeatPassword"
            autosize
            autocomplete="off"
            prefix-icon="el-icon-edit-outline"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addUserDialogCancel">Cancel</el-button>
        <el-button type="primary" @click="addUserDialogCommit"
          >Commit</el-button
        >
      </span>
    </el-dialog>
    <!-- Edit user dialog. -->
    <el-dialog
      title="Edit user profile"
      :visible.sync="editUserVisible"
      width="50%"
    >
      <el-form
        ref="editUserForm"
        :model="editUserForm"
        :rules="editUserFormRules"
        status-icon
        label-width="125px"
      >
        <el-form-item label="Username">
          <el-input
            type="text"
            v-model="editUserForm.username"
            autosize
            disabled
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- The Prop Value must be in the v-model defines. -->
        <el-form-item label="Real Name">
          <el-input
            type="text"
            v-model="editUserForm.realName"
            autosize
            disabled
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item label="E-mail" prop="email">
          <el-input
            type="text"
            v-model="editUserForm.email"
            autosize
            autocomplete="off"
            prefix-icon="el-icon-message"
          ></el-input>
        </el-form-item>
        <el-form-item label="Phone Number" prop="phoneNumber">
          <el-input
            type="text"
            v-model.number="editUserForm.phoneNumber"
            autosize
            autocomplete="off"
            prefix-icon="el-icon-phone-outline"
          ></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            type="password"
            v-model="editUserForm.password"
            autosize
            autocomplete="off"
            prefix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item label="Repeat" prop="repeatPassword">
          <el-input
            type="password"
            v-model="editUserForm.repeatPassword"
            autosize
            autocomplete="off"
            prefix-icon="el-icon-edit-outline"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editUserDialogCancel">Cancel</el-button>
        <el-button type="primary" @click="editUserDialogCommit"
          >Commit</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // Initialize to get data.
  created: function() {
    this.getUserList();
  },
  // mounted: function() {
  //   this.addUserVisible = false;
  //   this.editUserVisible = false;
  // },
  data: function() {
    // The following functions are rule checking functions.
    let checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("The e-mail is required."));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("E-mail format is incorrect."));
        }
      }, 100);
    };

    let checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please repeat the password."));
      } else if (value !== this.addUserForm.password) {
        callback(new Error("The two passwords are not consistent."));
      } else {
        callback();
      }
    };

    let checkPhoneNumber = (rule, value, callback) => {
      if (value.toString().length != 11) {
        callback(new Error("The length must be 11."));
      } else {
        callback();
      }
    };

    return {
      // Paging data returned from backend.
      userList: [],
      // User list total number.
      userTotalNumber: 0,
      // Add user form in dialog.
      addUserForm: {
        username: "",
        realName: "",
        phoneNumber: null,
        email: "",
        password: "",
        repeatPassword: ""
      },
      // Edit user form in dialog.
      editUserForm: {
        id: null,
        username: "",
        realName: "",
        phoneNumber: null,
        email: "",
        password: "",
        repeatPassword: ""
      },
      // Add user form Rules.
      addUserFormRules: {
        username: [
          {
            required: true,
            message: "The username is required.",
            trigger: "blur"
          },
          {
            min: 6,
            max: 15,
            message: "The length must be between 6 and 15.",
            trigger: "blur"
          }
        ],
        realName: [
          {
            required: true,
            message: "The real name is required.",
            trigger: "blur"
          },
          {
            min: 2,
            max: 15,
            message: "The length must be between 2 and 15.",
            trigger: "blur"
          }
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        phoneNumber: [
          {
            required: true,
            message: "The phone number is required.",
            trigger: "blur"
          },
          {
            type: "number",
            message: "Please input numbers.",
            trigger: "change"
          },
          {
            validator: checkPhoneNumber,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "The password is required.",
            trigger: "blur"
          },
          {
            min: 6,
            max: 15,
            message: "The length must be between 6 and 20.",
            trigger: "blur"
          }
        ],
        repeatPassword: [
          { required: true, validator: checkPassword, trigger: "blur" }
        ]
      },
      editUserFormRules: {
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        phoneNumber: [
          {
            required: true,
            message: "The phone number is required.",
            trigger: "blur"
          },
          {
            type: "number",
            message: "Please input numbers.",
            trigger: "change"
          },
          {
            validator: checkPhoneNumber,
            trigger: "blur"
          }
        ],
        password: [
          {
            min: 6,
            max: 15,
            message: "The length must be between 6 and 20.",
            trigger: "blur"
          }
        ],
        repeatPassword: [{ validator: checkPassword, trigger: "blur" }]
      },
      addUserVisible: false,
      editUserVisible: false,
      // Get the selected row in the user list table.
      tableSelectData: {},
      // Download only after selected.
      buttonDisabled: true,
      quaryString: "",
      pageNumber: 1,
      pageSize: 5
    };
  },
  methods: {
    getUserList: function() {
      this.$http
        .get("/user/list", {
          quaryString: this.quaryString,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        })
        .then(response => {
          console.log(response);
          this.userList = response.data.userList;
          this.userTotalNumber = response.data.userTotalNumber;
        })
        .catch(error => {
          console.log(error);
        });
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
    },
    // Add user action.
    addUser: function() {
      this.addUserVisible = true;
    },
    addUserDialogCancel: function() {
      this.$refs.addUserForm.resetFields();
      this.addUserVisible = false;
    },
    addUserDialogCommit: function() {
      this.$http
        .post("/user/add", {
          nickname: this.addUserForm.username,
          pwd: this.addUserForm.password,
          name: this.addUserForm.realName,
          tel: this.addUserForm.phoneNumber,
          email: this.addUserForm.email,
          role: 2
        })
        .then(response => {
          console.log(response);
          this.getUserList();
          this.$message.success("Add User Successful.");
          this.$refs.addUserForm.resetFields();
          this.addUserVisible = false;
        })
        .catch(error => {
          console.log(error);
          this.$message.error("Add User Failed.");
        });
      this.$refs.addUserForm.resetFields();
    },
    // Delete user action.
    deleteUser: function() {
      console.log(this.tableSelectData);
      this.$http
        .post("/user/delete", {
          id: this.tableSelectData.id
        })
        .then(response => {
          console.log(response);
          this.getUserList();
          this.$message.success("Delete User Successful.");
        })
        .catch(error => {
          console.log(error);
          this.$message.error("Delete User Failed.");
        });
    },
    // Click the edit user button.
    editUser: function() {
      this.editUserVisible = true;
      this.editUserForm.id = this.tableSelectData.id;
      this.editUserForm.username = this.tableSelectData.nickname;
      this.editUserForm.realName = this.tableSelectData.name;
      this.editUserForm.phoneNumber = this.tableSelectData.tel;
      this.editUserForm.email = this.tableSelectData.email;
      console.log(this.editUserForm, this.tableSelectData);
    },
    editUserDialogCancel: function() {
      this.$refs.editUserForm.resetFields();
      this.editUserVisible = false;
    },
    editUserDialogCommit: function() {
      this.$http
        .post("/user/update", {
          id: this.editUserForm.id,
          nickname: this.editUserForm.username,
          pwd: this.editUserForm.password,
          name: this.editUserForm.realName,
          tel: this.editUserForm.phoneNumber,
          email: this.editUserForm.email,
          role: this.tableSelectData.role
        })
        .then(response => {
          console.log(response);
          this.getUserList();
          this.$message.success("Edit User Successful.");
          this.$refs.editUserForm.resetFields();
          this.editUserVisible = false;
        })
        .catch(error => {
          console.log(error);
          this.$message.error("Edit User Failed.");
        });
    }
  },
  name: "Users"
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}

.el-table {
  margin-top: 15px;
  margin-bottom: 15px;
}

.el-pagination {
  margin-bottom: 15px;
}
</style>
