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

class _SignupPageState extends State<SignupPage> with TickerProviderStateMixin {
  late TextEditingController _controllerEmail;
  late TextEditingController _controllerPassword;
  late TextEditingController _controllerUsername;
  late AnimationController _controllerCircular;
  String errorMessage = '';
  bool reloading = false;

  @override
  void initState() {
    super.initState();
    _controllerEmail = TextEditingController();
    _controllerPassword = TextEditingController();
    _controllerUsername = TextEditingController();
    _controllerCircular = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 5),
    )..addListener(() {
        setState(() {});
      });
    _controllerCircular.repeat();
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

  void addError(String message) {
    setState(() {
      errorMessage = message;
    });
  }

  void reload() {
    setState(() {
      errorMessage = "";
      reloading = !reloading;
    });
  }

  Future<bool> checkError() async {
    var connectivityResult = await (Connectivity().checkConnectivity());
    if (connectivityResult == ConnectivityResult.none) {
      addError("Check Internet connection");
      return false;
    } // Add Alert Box

    if (_controllerUsername.text.isEmpty) {
      addError("Check your username field");
      return false;
    }
    if (_controllerEmail.text.isEmpty) {
      addError("Check your email field");
      return false;
    }
    bool emailValid = RegExp(
            r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
        .hasMatch(_controllerEmail.text);
    if (emailValid == false) {
      addError("Check your email field");
      return false;
    }

    if (_controllerPassword.text.isEmpty) {
      addError("Check your password field");
      return false;
    }
    return true;
  }

  void signInPressed() async {
    if (!await checkError()) return;
    reload();
    final responseSignUp = await register(
        username: _controllerUsername.text,
        host: widget.host,
        email: _controllerEmail.text,
        password: _controllerPassword.text);
    if (responseSignUp.statusCode != 200) {
      addError("Account already exists");
      return;
    }
    String token = jsonDecode(responseSignUp.body)["user"]['token'];
    final responseUser = await getUser(token: token, host: widget.host);
    User user = User.fromJson(
        token: token, json: jsonDecode(responseUser.body)['user']);
    print(user.toString());
    reload();
  }

  void gButtonPressed() async {
    final user;
    try {
      user = await GoogleSignInApi.login();
    } catch (e) {
      return;
    }

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

  Widget buildHeader() {
    if (reloading) {
      return CircularProgressIndicator(
        value: _controllerCircular.value,
        semanticsLabel: 'Linear progress indicator',
      );
    }
    if (errorMessage.isEmpty) {
      return const SizedBox.shrink();
    } else {
      return Text(
        errorMessage,
        style: const TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
      );
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
                  buildHeader(),
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
