import 'package:area/Components/Login/background.dart';
import 'package:area/Components/Login/gbutton.dart';
import 'package:area/Components/Login/text_span.dart';
import 'package:area/Pages/login_page.dart';
import 'package:flutter/material.dart';
import '../Components/Login/button.dart';
import '../API/api.dart';
import 'package:flutter/services.dart';
import '../Components/Login/or.dart';
import '../Components/Login/input_section.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'dart:convert';
import 'package:area/Models/user.dart';
import 'package:area/API/google.dart';
import 'package:area/Models/google.dart';

class SignupPage extends StatefulWidget {
  final String host;
  const SignupPage({Key? key, required this.host}) : super(key: key);
  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  late TextEditingController _controllerEmail;
  late TextEditingController _controllerPassword;
  late TextEditingController _controllerUsername;

  @override
  void initState() {
    super.initState();
    _controllerEmail = TextEditingController();
    _controllerPassword = TextEditingController();
    _controllerUsername = TextEditingController();
  }

  @override
  void dispose() {
    _controllerEmail.dispose();
    _controllerPassword.dispose();
    _controllerUsername.dispose();
    super.dispose();
  }

  void logInPressed() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => LoginPage(host: widget.host)),
    );
  }

  void signInPressed() async {
    var connectivityResult = await (Connectivity().checkConnectivity());
    if (connectivityResult == ConnectivityResult.none) return;

    bool emailValid = RegExp(
            r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
        .hasMatch(_controllerEmail.text);

    if (emailValid == false) return;
    final responseSignUp = await register(
        username: _controllerUsername.text,
        host: widget.host,
        email: _controllerEmail.text,
        password: _controllerPassword.text);
    if (responseSignUp.statusCode != 200) return; //ADD Alert BOX
    String token = jsonDecode(responseSignUp.body)['token'];
    final responseUser = await getUser(token: token, host: widget.host);
    User user = User.fromJson(
        token: token, json: jsonDecode(responseUser.body)['user']);
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
                    'Sign Up',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 40,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 40),
                  inputSection(
                      hintText: 'Username',
                      icon: Icons.email,
                      isSecure: false,
                      controller: _controllerUsername),
                  const SizedBox(height: 20),
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
                  button(name: 'Sign Up', onPressed: () => signInPressed()),
                  textSpan(
                      description: 'Already have an account ? ',
                      name: 'Sign In',
                      onTap: () => logInPressed()),
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
