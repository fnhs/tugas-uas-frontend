import { Button } from '@/components/ui/button';
import { CardDescription, CardContent, Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { saveTokens } from '@/lib/token';
import { cn } from '@/lib/utils';
import { loginSchema, type LoginSchema } from '@/lib/validators/auth';
import { signin } from '@/services/service';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { type ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

const LoginForm: React.FC<ComponentProps<'div'>> = ({ className, ...props }) => {

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: any) => {
        console.log(data);
        const response = await signin(data);
        if (response.code === 200) {
            toast.success(response.message);
            saveTokens(response.data.token);
            navigate("/");
        } else {
            toast.error(response.message);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    {...register("email")}
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                </div>
                                <Input id="password" type="password" required {...register("password")} />
                            </Field>
                            <Field>
                                <Button type="submit">Login</Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link to="/auth/signup">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginForm;