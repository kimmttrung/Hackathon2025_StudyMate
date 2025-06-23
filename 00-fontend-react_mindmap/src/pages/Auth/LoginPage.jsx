import LoginForm from "./LoginForm";
import FormHeader from "./FormHeader";

const LoginPage = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <FormHeader />
                <LoginForm />
            </div>
        </main>
    );
};

export default LoginPage;