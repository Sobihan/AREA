import 'package:flutter/material.dart';

Container rect(String name) {
  return Container(
    alignment: Alignment.center,
    decoration: const BoxDecoration(
        color: Colors.grey, borderRadius: BorderRadius.all(Radius.circular(5))),
    child: Text(name, style: const TextStyle(color: Colors.white)),
    height: 50,
    width: 100,
  );
}
