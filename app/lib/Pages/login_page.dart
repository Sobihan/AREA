import 'dart:convert';
import 'package:area/API/google.dart';
import 'package:area/Models/google.dart';
import 'package:area/Models/user.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:area/Components/Login/background.dart';
import 'package:area/Components/Login/gbutton.dart';
import 'package:area/Components/Login/text_span.dart';
import 'package:area/Pages/signup_page.dart';
import 'package:flutter/material.dart';
import '../Components/Login/button.dart';
import '../API/api.dart';
import 'package:flutter/services.dart';
import '../Components/Login/or.dart';
import '../Components/Login/input_section.dart';

class LoginPage extends StatefulWidget {
  final String host;
  const LoginPage({Key? key, required this.host}) : super(key: key);
  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late TextEditingController _controllerEmail;
  late TextEditingController _controllerPassword;
  String errorMessage = '';

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

  void signupPressed() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => SignupPage(host: widget.host)),
    );
  }

  void addError(String message) {
    setState(() {
      errorMessage = message;
    });
  }

  Future checkError() async {
    var connectivityResult = await (Connectivity().checkConnectivity());
    if (connectivityResult == ConnectivityResult.none) {
      addError("Check Internet connection");
      return;
    } // Add Alert Box
    if (_controllerEmail.text.isEmpty) {
      addError("Check your email field");
      return;
    }
    bool emailValid = RegExp(
            r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
        .hasMatch(_controllerEmail.text);
    if (emailValid == false) {
      addError("Check your email field");
      return;
    }

    if (_controllerPassword.text.isEmpty) {
      addError("Check your password field");
      return;
    }
  }

  void signInPressed() async {
    await checkError();

    final responseLogin = await login(
        host: widget.host,
        email: _controllerEmail.text,
        password: _controllerPassword.text);
    if (responseLogin.statusCode != 200) return; //ADD Alert BOX
    String token = jsonDecode(responseLogin.body)['token'];
    final responseUser = await getUser(token: token, host: widget.host);
    User user = User.fromJson(
        token: token, json: jsonDecode(responseUser.body)['user']);
    print(user.toString());
  }

  void gButtonPressed() async {
    final user = await GoogleSignInApi.login();

    if (user != null) {
      final token = await user.authentication;

      Google googleUser =
          Google.fromGoogleSignInAccount(google: user, token: token);
      final response = await signInWithGoogle(
          user: googleUser, host: widget.host); //Need to check with bend
      print(response.body);
      print(response.statusCode);
    } else {
      return;
    }
  }

  Widget buildError() {
    if (errorMessage.isEmpty) {
      return const SizedBox.shrink();
    } else {
      return Text(errorMessage);
    }
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
                  buildError(),
                  const Text(
                    'Sign In',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 40,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 50),
                  inputSection(
                      hintText: 'Email',
                      icon: Icons.email,
                      isSecure: false,
                      controller: _controllerEmail),
                  const SizedBox(height: 20),
                  inputSection(
                      hintText: 'Password',
                      icon: Icons.lock,
                      isSecure: true,
                      controller: _controllerPassword),
                  button(name: 'Login', onPressed: () => signInPressed()),
                  textSpan(
                      description: 'Don\'t have an Account ? ',
                      name: 'Sign Up',
                      onTap: () => signupPressed()),
                  const SizedBox(height: 10),
                  or(),
                  const SizedBox(height: 20),
                  gbutton(onTap: () => gButtonPressed())
                ],
              ),
            ),
          ),
        ],
      )),
    ));
  }
}
