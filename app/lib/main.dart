import 'package:area/Components/theme.dart';
import 'package:flutter/material.dart';
import './Pages/login_page.dart';
import 'package:flutter/foundation.dart';
import './Pages/host_page.dart';
import 'package:flutter/services.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky,
      overlays: [SystemUiOverlay.top]);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
        child: MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'AREA',
          theme: getMyTheme(),
          home: kReleaseMode == false
              ? const LoginPage(
                  host: "10.41.130.197") //Need to change in debug mode.
              : const HostAlert(),
        ));
  }
}
