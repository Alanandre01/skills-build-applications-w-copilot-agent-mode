#!/bin/bash

# Script de test des endpoints API OctoFit Tracker

# Déterminer l'URL de base
if [ -n "$CODESPACE_NAME" ]; then
    BASE_URL="https://$CODESPACE_NAME-8000.app.github.dev"
    echo "🌐 Mode Codespace détecté"
else
    BASE_URL="http://localhost:8000"
    echo "🏠 Mode local détecté"
fi

echo "🚀 URL de base: $BASE_URL"
echo ""
echo "==================================="
echo "Test des endpoints API OctoFit"
echo "==================================="
echo ""

# Test de l'endpoint racine
echo "📍 Test: GET $BASE_URL/"
curl -s -X GET "$BASE_URL/" | python3 -m json.tool
echo ""
echo "-----------------------------------"

# Test de l'endpoint users
echo "📍 Test: GET $BASE_URL/api/users/"
curl -s -X GET "$BASE_URL/api/users/" | python3 -m json.tool
echo ""
echo "-----------------------------------"

# Test de l'endpoint teams
echo "📍 Test: GET $BASE_URL/api/teams/"
curl -s -X GET "$BASE_URL/api/teams/" | python3 -m json.tool
echo ""
echo "-----------------------------------"

# Test de l'endpoint activities
echo "📍 Test: GET $BASE_URL/api/activities/"
curl -s -X GET "$BASE_URL/api/activities/" | python3 -m json.tool
echo ""
echo "-----------------------------------"

# Test de l'endpoint workouts
echo "📍 Test: GET $BASE_URL/api/workouts/"
curl -s -X GET "$BASE_URL/api/workouts/" | python3 -m json.tool
echo ""
echo "-----------------------------------"

# Test de l'endpoint leaderboard
echo "📍 Test: GET $BASE_URL/api/leaderboard/"
curl -s -X GET "$BASE_URL/api/leaderboard/" | python3 -m json.tool
echo ""
echo "-----------------------------------"

echo ""
echo "✅ Tests terminés!"
