export declare class AuthService {
    register(data: any): Promise<any>;
    login(email: string, password: string): Promise<{
        token: string;
        user: any;
    }>;
    signOut(): {
        message: string;
    };
}
//# sourceMappingURL=auth.service.d.ts.map