import 'package:area/Components/Login/background.dart';
import 'package:area/Components/Login/gbutton.dart';
import 'package:area/Components/Login/text_span.dart';
import 'package:flutter/material.dart';
import '../Components/Login/input.dart';
import '../Components/Login/button.dart';
import '../API/api.dart';
import 'package:flutter/services.dart';
import '../Components/Login/or.dart';

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

  Widget buildInputSection(
      {required String hintText,
      required IconData icon,
      required bool isSecure,
      required TextEditingController controller}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          hintText,
          style: const TextStyle(
              color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 10),
        Container(
            alignment: Alignment.center,
            height: 60,
            decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(10),
                boxShadow: const [
                  BoxShadow(
                      color: Colors.black26,
                      blurRadius: 6,
                      offset: Offset(0, 2))
                ]),
            child: input(
                hintText: hintText,
                icon: icon,
                isSecure: isSecure,
                controller: controller))
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: AnnotatedRegion<SystemUiOverlayStyle>(
      value: SystemUiOverlayStyle.light,
      child: GestureDetector(
          child: Stack(
        children: <Widget>[
          Container(
            height: double.infinity,
            width: double.infinity,
            decoration: background(),
            child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              padding: const EdgeInsets.symmetric(
                horizontal: 25,
                vertical: 120,
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  const Text(
                    'Sign In',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 40,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 50),
                  buildInputSection(
                      hintText: 'Email',
                      icon: Icons.email,
                      isSecure: false,
                      controller: _controllerEmail),
                  const SizedBox(height: 20),
                  buildInputSection(
                      hintText: 'Password',
                      icon: Icons.lock,
                      isSecure: true,
                      controller: _controllerPassword),
                  button(
                      name: 'Login',
                      onPressed: () => printer(_controllerEmail.text)),
                  textSpan(
                      description: 'Don\'t have an Account ? ',
                      name: 'Sign Up',
                      onTap: () => print('Sign Up pressed')),
                  const SizedBox(height: 10),
                  or(),
                  const SizedBox(height: 20),
                  gbutton(onTap: () => print('Gbutton pressed'))
                ],
              ),
            ),
          ),
        ],
      )),
    ));

    // return Scaffold(
    //     resizeToAvoidBottomInset: false,
    //     body: Column(
    //       children: <Widget>[
    //         getMyHeader("AREA"),
    //         const SizedBox(height: 50),
    //         getMyInput(_controllerEmail, Icons.mail_outline, "Email", false),
    //         const SizedBox(height: 40),
    //         getMyInput(_controllerPassword, Icons.password, "Password", true),
    //         const SizedBox(height: 50),
    //         getMyLongButton("Sign In", () => {printer(_controllerEmail.text)},
    //             CustomColor.whiteBlue),
    //         const SizedBox(height: 30),
    //         getMyLongButton("Sign Up", () => {printer(_controllerEmail.text)},
    //             CustomColor.lightBlue)
    //         // Text(_controller.text == "" ? "Hello" : _controller.text)
    //       ],
    //     ));
  }
}
