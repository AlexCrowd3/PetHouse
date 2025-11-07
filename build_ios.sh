set -e

echo "========================================="
echo "Проверка Homebrew"
echo "========================================="
if ! command -v brew &> /dev/null; then
    echo "Homebrew не найден! Устанавливаем автоматически..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
else
    echo "Homebrew найден: $(brew --version)"
fi

echo "========================================="
echo "Обновление Homebrew"
echo "========================================="
brew update
brew upgrade

echo "========================================="
echo "Проверка Node.js"
echo "========================================="
if ! command -v node &> /dev/null; then
    echo "Node.js не найден! Устанавливаем LTS через Homebrew..."
    brew install node@24
    brew link --overwrite node@24
else
    echo "Node.js найден: $(node -v)"
fi

echo "========================================="
echo "Проверка Watchman"
echo "========================================="
if ! command -v watchman &> /dev/null; then
    echo "Watchman не найден. Устанавливаем..."
    brew install watchman
else
    echo "Watchman найден: $(watchman --version)"
fi

echo "========================================="
echo "Проверка CocoaPods"
echo "========================================="
if ! command -v pod &> /dev/null; then
    echo "CocoaPods не найден. Устанавливаем через Homebrew..."
    brew install cocoapods
else
    echo "CocoaPods найден: $(pod --version)"
fi

echo "========================================="
echo "Установка npm пакетов"
echo "========================================="
npm install

if ! npm list expo >/dev/null 2>&1; then
  echo "Устанавливаем пакет expo..."
  npm install expo
fi

if ! npm list @react-native-community/cli >/dev/null 2>&1; then
  echo "Устанавливаем @react-native-community/cli..."
  npm install --save-dev @react-native-community/cli
fi

echo "========================================="
echo "Очистка iOS и Metro"
echo "========================================="
rm -rf ios build
watchman watch-del-all || true
rm -rf $TMPDIR/metro-* $TMPDIR/react-*

echo "========================================="
echo "Генерация iOS проекта через Expo"
echo "========================================="
npx expo prebuild --platform ios --clean

if [ -f "ios/Hikingprephelper/AppDelegate.swift" ]; then
  npm run fix:metro
else
  echo "AppDelegate.swift не найден, пропускаем disable-metro.js"
fi

echo "========================================="
echo "Генерация JS-бандла"
echo "========================================="
npm run bundle:ios

echo "========================================="
echo "iOS проект успешно сгенерирован!"
echo "========================================="

open "https://www.anekdot.ru/i/caricatures/normal/25/2/16/yumor-dnya_33477.jpg"
open "https://shutok.ru/uploads/posts/2022-07/1657647272_shutok.ru.6.jpg"