"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./modules/users/user.route"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const vehices_routes_1 = __importDefault(require("./modules/vehicles/vehices.routes"));
const booking_route_1 = __importDefault(require("./modules/bookings/booking.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello, B6A2!");
});
app.use("/api/v1", user_route_1.default);
app.use("/api/v1/auth", auth_route_1.default);
app.use("/api/v1", vehices_routes_1.default);
app.use("/api/v1", booking_route_1.default);
app.use((req, res) => {
    res.status(404).send("Route not found");
});
exports.default = app;
//# sourceMappingURL=app.js.map