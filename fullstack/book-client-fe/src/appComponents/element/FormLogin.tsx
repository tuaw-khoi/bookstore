"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useUser from "@/hooks/useUser";
import useCheckAuthen from "@/midlewares/checkAuthen";
import { useEffect } from "react";
import useAuthenStore from "@/midlewares/authenStore";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});
const FormLogin = () => {
  const { checkTokenExpiration } = useCheckAuthen();
  const { login } = useUser();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const token = localStorage.getItem("token");
  const onSubmit = async (data: any) => {
    login.mutate(data);
    form.setValue("username", "");
    form.setValue("password", "");
  };
  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        if (!token) return;
        await checkTokenExpiration(token);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    handleAuthentication();
  }, [token]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Tài Khoản</CardTitle>
            <CardDescription>
              Đăng nhập tại đây! Nhấn nút đăng nhập
            </CardDescription>
            {login.isError ? (
              <Alert variant="destructive" className="rounded-xl ">
                <AlertCircle className="h-4 w-4 " />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {login.error.response.data.msg}
                </AlertDescription>
              </Alert>
            ) : null}
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Tên Đăng Nhập</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên Đăng Nhập" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Mật Khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Mật Khẩu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="bg-blue-400 hover:bg-blue-700 rounded-[4px]"
              type="submit"
            >
              Đăng Nhập
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default FormLogin;
