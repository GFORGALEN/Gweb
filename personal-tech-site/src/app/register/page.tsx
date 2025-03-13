// 暂时重定向到登录页面，后续可以实现注册功能
import { redirect } from "next/navigation";

export default function RegisterPage() {
  redirect("/login");
}