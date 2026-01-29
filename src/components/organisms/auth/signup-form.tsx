import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup, Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React, { type ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupSchema } from '@/lib/validators/auth';
import { signup } from '@/services/service';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router';

const SignupForm: React.FC<ComponentProps<typeof Card>> = ({ ...props }) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupSchema) => {
        console.log("Valid Form Data:", data);
        const response: any = await signup(data);
        if (response.code === 201) {
            toast.success("Signup successful");
            navigate("/auth/signin");
        } else {
            toast.error("Signup failed");
        }
    };

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                {...register('name')}
                            />
                            {errors.name && (
                                <p className="text-destructive text-sm font-medium">{errors.name.message}</p>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-destructive text-sm font-medium">{errors.email.message}</p>
                            )}
                            <FieldDescription>
                                We&apos;ll use this to contact you. We will not share your email with anyone else.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-destructive text-sm font-medium">{errors.password.message}</p>
                            )}
                            <FieldDescription>
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <Input
                                id="confirm-password"
                                type="password"
                                {...register('confirmPassword')}
                            />
                            {errors.confirmPassword && (
                                <p className="text-destructive text-sm font-medium">{errors.confirmPassword.message}</p>
                            )}
                            <FieldDescription>Please confirm your password.</FieldDescription>
                        </Field>
                        <FieldGroup>
                            <Field>
                                <Button type="submit">Create Account</Button>
                                <FieldDescription className="px-6 text-center">
                                    Already have an account? <Link to="/auth/signin">Sign in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
};

export default SignupForm;
