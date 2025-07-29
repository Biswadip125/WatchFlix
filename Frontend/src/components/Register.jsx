import HeroForm from "./HeroForm";

const Register = () => {
  return (
    <>
      <HeroForm
        isLogin={false}
        link={"/"}
        apiLink={"register"}
        navigateLink={"/"}
      />
    </>
  );
};

export default Register;
