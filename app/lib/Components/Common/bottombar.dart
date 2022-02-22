import 'package:area/Components/Common/color.dart';
import 'package:area/Models/user.dart';
import 'package:area/Pages/area_page.dart';
import 'package:area/Pages/help_page.dart';
import 'package:area/Pages/user_page.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class BottomBar extends StatefulWidget {
  final String host;
  final User user;
  final dynamic actionReaction;

  const BottomBar(
      {Key? key,
      required this.host,
      required this.user,
      required this.actionReaction})
      : super(key: key);
  @override
  State<BottomBar> createState() => _BottomBarState();
}

class _BottomBarState extends State<BottomBar> with TickerProviderStateMixin {
  late List<StatefulWidget> _pages;
  int _selectedIndex = 0;
  @override
  void initState() {
    super.initState();
    _pages = [
      AreaPage(
          host: widget.host,
          user: widget.user,
          actionReaction: widget.actionReaction),
      UserPage(host: widget.host, user: widget.user),
      HelpPage(host: widget.host, user: widget.user)
    ];
  }

  @override
  void dispose() {
    super.dispose();
  }

  void onTapHandler(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        bottomNavigationBar: CurvedNavigationBar(
          animationCurve: Curves.easeInOutBack,
          backgroundColor: CustomColor.lightBlue,
          height: 60,
          items: <Icon>[
            Icon(
              FontAwesomeIcons.cog,
              size: 30,
              color: _selectedIndex == 0 ? CustomColor.darkBlue : Colors.black,
            ),
            Icon(
              FontAwesomeIcons.userAlt,
              size: 30,
              color: _selectedIndex == 1 ? CustomColor.darkBlue : Colors.black,
            ),
            // Icon(
            //   FontAwesomeIcons.solidQuestionCircle,
            //   size: 30,
            //   color: _selectedIndex == 2 ? CustomColor.darkBlue : Colors.black,
            // ),
          ],
          onTap: (index) {
            onTapHandler(index);
          },
        ),
        body: _pages[_selectedIndex]);
  }
}
