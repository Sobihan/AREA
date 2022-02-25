import 'package:area/API/reddit.dart';
import 'package:area/Components/Common/bottombar.dart';
import 'package:area/Components/Login/background.dart';
import 'package:area/Components/Login/gbutton.dart';
import 'package:area/Components/Login/rbutton.dart';
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
import 'package:delayed_display/delayed_display.dart';
import 'package:oauth2_client/google_oauth2_client.dart';
import 'package:oauth2_client/access_token_response.dart';

GoogleOAuth2Client googleClient = GoogleOAuth2Client(
    redirectUri:
        'com.example.area:/oauth2redirect', //Just one slash, required by Google specs
    customUriScheme: 'com.example.area');

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

  Future<bool> checkError(bool google) async {
    var connectivityResult = await (Connectivity().checkConnectivity());
    if (connectivityResult == ConnectivityResult.none) {
      addError("Check Internet connection");
      return false;
    } // Add Alert Box
    if (google) return true;
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
    if (!await checkError(false)) return;
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
    final responseService =
        await getUserServices(token: token, host: widget.host);
    final serviceJson = jsonDecode(responseService.body);
    User user = User.fromJson(
        avatar: 'null',
        token: token,
        json: jsonDecode(responseUser.body)['user'],
        isGoogle: serviceJson['google'],
        isReddit: serviceJson['reddit']);
    final actionReaction = await getActionRea(host: widget.host);
    reload();
    Navigator.push(
      context,
      MaterialPageRoute(
          builder: (context) => BottomBar(
                host: widget.host,
                user: user,
                actionReaction: jsonDecode(actionReaction.body),
              )),
    );
  }

  // void gButtonPressed() async {
  //   if (!await checkError(true)) return;
  //   reload();
  //   final user;
  //   try {
  //     user = await GoogleSignInApi.login();
  //   } catch (e) {
  //     return;
  //   }

  //   if (user == null) return;
  //   final token = await user.authentication;
  //   Google googleUser =
  //       Google.fromGoogleSignInAccount(google: user, token: token);
  //   final response = await signInWithGoogle(
  //       user: googleUser, host: widget.host); //Need to check with bend
  //   if (response.statusCode != 200) {
  //     addError("Please try Again");
  //     return;
  //   }
  //   String userToken;
  //   if (jsonDecode(response.body)['token'] == null) {
  //     userToken = jsonDecode(response.body)['user']['token'];
  //   } else {
  //     userToken = jsonDecode(response.body)['token'];
  //   }

  //   final responseUser = await getUser(token: userToken, host: widget.host);
  //   final responseService =
  //       await getUserServices(token: userToken, host: widget.host);
  //   final jsonService = jsonDecode(responseService.body);
  //   User userConnect = User.fromJson(
  //       json: jsonDecode(responseUser.body)['user'],
  //       token: userToken,
  //       isGoogle: jsonService['google'],
  //       isReddit: jsonService['reddit']);
  //   final googleisConnect = await GoogleSignInApi.isConnect();
  //   if (googleisConnect) {
  //     GoogleSignInApi.logout();
  //   }
  //   final actionReaction = await getActionRea(host: widget.host);
  //   reload();
  //   Navigator.push(
  //     context,
  //     MaterialPageRoute(
  //         builder: (context) => BottomBar(
  //               host: widget.host,
  //               user: userConnect,
  //               actionReaction: jsonDecode(actionReaction.body),
  //             )),
  //   );
  // }
  void gButtonPressed() async {
    if (!await checkError(true)) return;
    reload();
    Google googleUser;
    try {
      AccessTokenResponse t = await googleClient.getTokenWithAuthCodeFlow(
          clientId:
              "789963154068-fkl9gdj0d898pcs5poa63av7fegto54b.apps.googleusercontent.com",
          scopes: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/gmail.readonly",
            "https://www.googleapis.com/auth/userinfo.profile"
          ]);
      final response = await getGoogleInfo(accessToken: t.accessToken!);
      final json = jsonDecode(response.body);
      googleUser = Google(
          refreshToken: t.refreshToken!,
          accessToken: t.accessToken!,
          googleID: json["id"],
          displayName: json["name"],
          email: json["email"]);
    } catch (error) {
      reload();
      addError("Please try Again");
      return;
    }
    final responseToLog =
        await signInWithGoogle(user: googleUser, host: widget.host);
    if (responseToLog.statusCode != 200) {
      reload();
      addError("Please try Again");
      return;
    }
    String userToken;
    if (jsonDecode(responseToLog.body)['token'] == null) {
      userToken = jsonDecode(responseToLog.body)['user']['token'];
    } else {
      userToken = jsonDecode(responseToLog.body)['token'];
    }

    final responseUser = await getUser(token: userToken, host: widget.host);
    final serviceResponse =
        await getUserServices(token: userToken, host: widget.host);
    final jsonService = jsonDecode(serviceResponse.body);
    User userConnect = User.fromJson(
        avatar: 'null',
        json: jsonDecode(responseUser.body)['user'],
        token: userToken,
        isGoogle: jsonService['google'],
        isReddit: jsonService['reddit']);
    final actionReaction = await getActionRea(host: widget.host);
    reload();
    Navigator.push(
      context,
      MaterialPageRoute(
          builder: (context) => BottomBar(
                host: widget.host,
                user: userConnect,
                actionReaction: jsonDecode(actionReaction.body),
              )),
    );
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

  void rButtonPressed() async {
    if (!await checkError(true)) return;
    reload();
    String accessToken = await signInReddit();
    if (accessToken == "error") {
      addError("Please Try Again");
      return;
    }
    reload();
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
                  const DelayedDisplay(
                    delay: Duration(microseconds: 10000),
                    child: Text(
                      'Sign Up',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 40,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const SizedBox(height: 40),
                  DelayedDisplay(
                      delay: const Duration(microseconds: 15000),
                      child: inputSection(
                          hintText: 'Username',
                          icon: Icons.email,
                          isSecure: false,
                          controller: _controllerUsername)),
                  const SizedBox(height: 20),
                  DelayedDisplay(
                      delay: const Duration(microseconds: 20000),
                      child: inputSection(
                          hintText: 'Email',
                          icon: Icons.email,
                          isSecure: false,
                          controller: _controllerEmail)),
                  const SizedBox(height: 20),
                  DelayedDisplay(
                      delay: const Duration(microseconds: 25000),
                      child: inputSection(
                          hintText: 'Password',
                          icon: Icons.lock,
                          isSecure: true,
                          controller: _controllerPassword)),
                  DelayedDisplay(
                      delay: const Duration(microseconds: 30000),
                      child: button(
                          name: 'Sign Up', onPressed: () => signInPressed())),
                  DelayedDisplay(
                      delay: const Duration(microseconds: 35000),
                      child: textSpan(
                          description: 'Already have an account ? ',
                          name: 'Sign In',
                          onTap: () => logInPressed())),
                  const SizedBox(height: 10),
                  DelayedDisplay(
                      delay: const Duration(microseconds: 40000), child: or()),
                  const SizedBox(height: 20),
                  DelayedDisplay(
                      delay: const Duration(microseconds: 45000),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          gbutton(onTap: () => gButtonPressed()),
                        ],
                      ))
                ],
              ),
            ),
          ),
        ],
      )),
    ));
  }
}
