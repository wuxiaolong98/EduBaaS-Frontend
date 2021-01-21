<template>
    <div>
        <div class="container">
            <div class="avatar">
                <img src="../assets/logo.png" alt="Logo">
            </div>
            <!-- 'Ref' stands for the Form instance. -->
            <el-form :model="registerForm" :rules="registerFormRules" status-icon ref="registerForm" label-width="125px" class="registerForm">
            <el-form-item label="Username" prop="username">
                <el-input type="text" v-model="registerForm.username" autosize autocomplete="off" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <!-- The Prop Value must be in the v-model defines. -->
            <el-form-item label="Real Name" prop="realName">
                <el-input type="text" v-model="registerForm.realName" autosize autocomplete="off" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item label="E-mail" prop="email">
                <el-input type="text" v-model="registerForm.email" autosize autocomplete="off" prefix-icon="el-icon-message"></el-input>
            </el-form-item>
            <el-form-item label="Phone Number" prop="phoneNumber">
                <el-input type="text" v-model.number="registerForm.phoneNumber" autosize autocomplete="off" prefix-icon="el-icon-phone-outline"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="registerForm.password" autosize autocomplete="off" prefix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="Repeat" prop="repeatPassword">
                <el-input type="password" v-model="registerForm.repeatPassword" autosize autocomplete="off" prefix-icon="el-icon-edit-outline"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')">Submit</el-button>
                <el-button type="info" @click="resetForm('registerForm')">Reset</el-button>
                <el-button type="success" @click="login">Login</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        let checkEmail = (rule, value, callback) => {
            const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
            if (!value) {
                return callback(new Error('The e-mail is required.'))
                }
                setTimeout(() => {
                if (mailReg.test(value)) {
                    callback()
                } else {
                    callback(new Error('E-mail format is incorrect.'))
                }
            }, 100)
        }

        let checkPassword = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('Please repeat the password.'));
            } else if (value !== this.registerForm.password) {
            callback(new Error('The two passwords are not consistent.'));
            } else {
            callback();
            }
        }

        return{
            registerForm: {
                username: null,
                realName: null,
                email: null,
                phoneNumber: null,
                password: null,
                repeatPassword: null
            },
            registerFormRules: {
                username: [
                    { required: true, message: 'The username is required.', trigger: 'blur' },
                    { min: 6, max: 15, message: 'The length must be between 6 and 15.', trigger: 'blur' }
                ],
                realName: [
                    { required: true, message: 'The real name is required.', trigger: 'blur' },
                    { min: 2, max: 15, message: 'The length must be between 2 and 15.', trigger: 'blur' }
                ],
                email: [
                    { required: true, validator: checkEmail, trigger: 'blur' }
                ],
                phoneNumber: [
                    { required: true, message: 'The phone number is required.', trigger: 'blur' },
                    { type: 'number', message: 'Please input numbers.', trigger: 'change' },
                    { min: 11, max: 11, message: 'The length must be 11.', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'The password is required.', trigger: 'blur' },
                    { min: 6, max: 15, message: 'The length must be between 6 and 20.', trigger: 'blur' }
                ],
                repeatPassword:[
                    { required: true, validator: checkPassword, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm: function(formName){
            this.$refs[formName].validate( (valid) => {
                if (valid){
                    this.$http.post('/user/add', {
                        'nickname': this.registerForm.username,
                        'pwd': this.registerForm.password,
                        'name': this.registerForm.realName,
                        'tel': this.registerForm.phoneNumber,
                        'role': 2
                    })
                    .then( (response) => {
                        console.log(response);
                        this.$message.success('Register Successful.');
                        this.$router.push('/login');
                    } )
                    .catch( (error) => {
                        console.log(error);
                        this.$message.error('Register Failed.');
                    } )
                } else {
                    return;
                }
            } )
        },
        resetForm: function(formName){
            this.$refs[formName].resetFields();
        },
        login: function(){
            this.$router.push("/login");
        }
    },
    name: 'Register'
}
</script>

<style scoped>

.container{
    width: 450px;
    height: 500px;
    /* border: 2px solid #a1a1a1;
    border-radius: 5px; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.avatar{
    height: 100px;
    width: 100px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -120%);
}

.avatar img{
    width: 100%;
    height: 100%;
    border: 1px solid #fcfcfc;
    border-radius: 50%;
    background-color: #fafafa;
}

</style>