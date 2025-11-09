import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import {
  EyeIcon,
  EyeOffIcon,
  Loader2,
  LockIcon,
  MailIcon,
  User2Icon,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Create Account</CardTitle>
          <CardDescription className="text-center mt-1">
            Join thousands of professionals today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <InputGroup>
                  <InputGroupInput
                    type="text"
                    placeholder="Enter full name"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  <InputGroupAddon>
                    <User2Icon />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <InputGroup>
                  <InputGroupInput
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <InputGroup>
                  <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 8 characters"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    pattern=".{8,}"
                  />
                  <InputGroupAddon>
                    <LockIcon />
                  </InputGroupAddon>
                  <InputGroupButton
                    title="Show password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </InputGroupButton>
                </InputGroup>
              </div>
            </div>
            <Button className="w-full mt-6" disabled={loading}>
              {loading && <Loader2 className="animate-spin" />}
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex gap-2 justify-center items-center">
          <p>Already have an account?</p>
          <Link to="/login" className="text-indigo-600">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
