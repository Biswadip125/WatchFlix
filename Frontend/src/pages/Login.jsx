import HeroForm from "../components/HeroForm";
const Login = () => {
  return (
    <>
      <HeroForm
        isLogin={true}
        link={"/register"}
        apiLink={"login"}
        navigateLink={"/"}
      />
    </>
  );
};
export default Login;
