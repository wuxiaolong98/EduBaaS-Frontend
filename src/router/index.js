import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/home",
  //   name: "Home",
  //   component: Home
  // },
  {
    path: "/home/administrator",
    name: "Administrator",
    component: () => 
      import(/* webpackChunkName: "Administrator" */ "../views/Administrator.vue"),
    children: [
      {
        path: "/home/administrator/welcome",
        name: "Welcome",
        component: () => 
        import(/* webpackChunkName: "Welcome" */ "../components/Welcome.vue")
      },
      {
        path: "/home/administrator/users",
        name: "Users",
        component: () => 
        import(/* webpackChunkName: "Users" */ "../components/Users.vue")
      },
      {
        path: "/home/administrator/experiment",
        name: "Experiment",
        component: () => 
        import(/* webpackChunkName: "Experiment" */ "../components/Experiment.vue")
      },
      {
        path: "/home/administrator/uploadTemplate",
        name: "UploadTemplate",
        component: () => 
        import(/* webpackChunkName: "UploadTemplate" */ "../components/UploadTemplate.vue")
      }
    ]
  },
  {
    path: "/home/student",
    name: "Student",
    component: () =>
      import(/* webpackChunkName: "Student" */ "../views/Student.vue")
  },
  {
    path: "/home/teacher",
    name: "Teacher",
    component: () =>
      import(/* webpackChunkName: "Teacher" */ "../views/Teacher.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if(to.path == '/login' || to.path == '/register'){
    return next();
  } else {
    const token = window.sessionStorage.getItem('token');
    if (!token){
      return next('/login');
    } else {
      next();
    }
  }
})

export default router;
