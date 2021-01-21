<template>
  <div class="home-container">
    <el-container class="home-container">
      <el-header>
        <div>
          <img src="../assets/logo.png" height="50px" alt="Logo">
          <span>Blockchain Education Platform</span>
        </div>
        <div>
          <!-- <el-avatar :size="50" :src="avatarUrl"></el-avatar> -->
          <el-button type="danger" icon="el-icon-s-custom" circle></el-button>
          <span>{{ username }}</span>
          <el-button type="success" @click="logout">Logout</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside class="menu-vertical" >
          <el-menu background-color="#232323" text-color="#ffffff" router 
          :default-active="defaultActive" @select="selectChange">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>模板管理</span>
              </template>
              <el-menu-item index="#11">下载模板</el-menu-item>
              <el-menu-item index="#12">导出模板</el-menu-item>
              <el-menu-item index="uploadTemplate">导入模板</el-menu-item>
            </el-submenu>
            <el-menu-item index="users">
                <i class="el-icon-user"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-date"></i>
                <span>课程管理</span>
              </template>
              <el-menu-item index="#31">课程</el-menu-item>
              <el-menu-item index="#32">课件</el-menu-item>
            </el-submenu>
            <el-menu-item index="experiment">
              <i class="el-icon-data-analysis"></i>
              <span slot="title">实验管理</span>
            </el-menu-item>
            <el-menu-item index="#5">
              <i class="el-icon-notebook-1"></i>
              <span slot="title">实验作业</span>
            </el-menu-item>
            <el-menu-item index="#6">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">考试设计</span>
            </el-menu-item>
            <el-menu-item index="#7">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">考试作业</span>
            </el-menu-item>
            <el-menu-item index="#8">
              <i class="el-icon-coin"></i>
              <span slot="title">区块链管理</span>
            </el-menu-item>
            <el-menu-item index="#9">
              <i class="el-icon-files"></i>
              <span slot="title">字典管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
            <el-main>
              <!-- Components router. -->
              <router-view></router-view>
            </el-main>
        </el-container>
      </el-container>
  </el-container>
  </div>
</template>

<script>
// import avatarUrl from '@/assets/default_avatar.png'

export default {
  created: function (){
    console.log(this)
    this.username = window.sessionStorage.getItem('username');
  },
  data: function (){
    return {
      // avatarUrl: avatarUrl
      username: '',
      defaultActive: ''
    }
  },
  methods: {
    selectChange: function(index){
      this.defaultActive = index;
    },
    logout: function() {
      window.sessionStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

.home-container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: #b6b1b1; */
  border-style: outset;
  border-color: #232323;
  border-width: 3px;
}

.el-header div {
  display: flex;
  align-items: center;
}

.el-header div span {
  margin-left: 10px;
  margin-right: 10px;
}

.menu-vertical {
  width: 100%;
  background-color: #232323;
}

</style>