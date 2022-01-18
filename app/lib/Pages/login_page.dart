import 'package:flutter/material.dart';
import '../Components/Common/header.dart';
import '../Components/Login/input.dart';
import '../Components/Login/long_button.dart';
import '../API/api.dart';
import '../Components/Common/color.dart';

class LoginPage extends StatefulWidget {
  final String host;
  const LoginPage({Key? key, required this.host}) : super(key: key);
  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late TextEditingController _controllerEmail;
  late TextEditingController _controllerPassword;

  @override
  void initState() {
    super.initState();
    _controllerEmail = TextEditingController();
    _controllerPassword = TextEditingController();
  }

  @override
  void dispose() {
    _controllerEmail.dispose();
    _controllerPassword.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        body: Column(
          children: <Widget>[
            getMyHeader("AREA"),
            const SizedBox(height: 50),
            getMyInput(_controllerEmail, Icons.mail_outline, "Email", false),
            const SizedBox(height: 40),
            getMyInput(_controllerPassword, Icons.password, "Password", true),
            const SizedBox(height: 50),
            getMyLongButton("Sign In", () => {printer(_controllerEmail.text)},
                CustomColor.whiteBlue),
            const SizedBox(height: 30),
            getMyLongButton("Sign Up", () => {printer(_controllerEmail.text)},
                CustomColor.lightBlue)
            // Text(_controller.text == "" ? "Hello" : _controller.text)
          ],
        ));
  }
}
