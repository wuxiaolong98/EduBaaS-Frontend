<template>
  <div>
    <div class="container">
      <div class="avatar">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <!-- 'Ref' stands for the Form instance. -->
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        status-icon
        ref="loginForm"
        label-width="100px"
        class="loginForm"
      >
        <el-form-item label="Username" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autosize
            autocomplete="off"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- The Prop Value must be in the v-model defines. -->
        <el-form-item label="Password" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autosize
            autocomplete="off"
            prefix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >Submit</el-button
          >
          <el-button type="info" @click="resetForm('loginForm')"
            >Reset</el-button
          >
          <el-button type="success" @click="register">Register</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      loginForm: {
        username: null,
        password: null
      },
      loginFormRules: {
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
        password: [
          {
            required: true,
            message: "The password is required.",
            trigger: "blur"
          },
          {
            min: 6,
            max: 15,
            message: "The length must be between 6 and 15.",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .get("/login", this.loginForm)
            .then(response => {
              console.log(response);
              let token = response.data.token;
              let role = response.data.role;
              window.sessionStorage.setItem("token", token);
              window.sessionStorage.setItem("role", role);
              window.sessionStorage.setItem(
                "username",
                this.loginForm.username
              );
              if (role == 0) {
                this.$router.push("/home/administrator/index");
              } else if (role == 1) {
                this.$router.push("/home/teacher");
              } else if (role == 2) {
                this.$router.push("/home/student");
              } else {
                this.$message.error("Illegal Status.");
                return;
              }
              this.$message.success("Login Successful.");
            })
            .catch(error => {
              console.log(error);
              this.$message.error("Login Failed.");
            });
        } else {
          return;
        }
      });
    },
    resetForm: function(formName) {
      this.$refs[formName].resetFields();
    },
    register: function() {
      this.$router.push("/register");
    }
  },
  name: "Login"
};
</script>

<style scoped>
.container {
  width: 450px;
  height: 200px;
  /* border: 2px solid #a1a1a1;
    border-radius: 5px; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar {
  height: 100px;
  width: 100px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -120%);
}

.avatar img {
  width: 100%;
  height: 100%;
  border: 1px solid #fcfcfc;
  border-radius: 50%;
  background-color: #fafafa;
}
</style>
