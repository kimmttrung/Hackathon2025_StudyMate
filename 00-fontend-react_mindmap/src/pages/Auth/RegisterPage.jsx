
import FormHeader from "./FormHeader";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <FormHeader />
                <RegisterForm />
            </div>
        </main>
    );
};

export default RegisterPage;