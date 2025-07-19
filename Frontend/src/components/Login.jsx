import Header from "./Header";
import HeroForm from "./HeroForm";
const Login = () => {
  return (
    <>
      <Header buttonName={"Sign Up"} link={"/register"} />
      <HeroForm
        isLogin={true}
        link={"/register"}
        apiLink={"login"}
        navigateLink={"/browse"}
      />
    </>
  );
};
export default Login;
