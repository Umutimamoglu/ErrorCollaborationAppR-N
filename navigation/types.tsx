import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IBug } from '../types';

export type HomeStackParamlist = {
    Home: undefined;
};

export type AppStackParamList = {
    Root: NavigatorScreenParams<RootBottomTabParamList>;
    Settings: undefined;
};

export type AuthStackParamList = {
    Welcome: undefined;
    SignIn: undefined;
    SignUp: undefined;
};

export type RootBottomTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamlist>;
    Today: undefined;
    MyBugs: NavigatorScreenParams<BugsStackParamList>;
    Feed: undefined;
    Profile: undefined;
    CategoriesStack: NavigatorScreenParams<CategoriesStackParamList>;
};

export type BugsNavigationType = NativeStackNavigationProp<BugsStackParamList>;

export type BugsStackParamList = {
    Bugs: undefined;
    BugDetail: {
        bug: IBug;
    };
};

export type CategoriesStackParamList = {
    Categories: undefined;
    Category: {
        id: string;
    };
    CreateCategory: undefined;
};

export type AuthScreenNavigationType<
    RouteName extends keyof AuthStackParamList
> = CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList, RouteName>,
    NativeStackNavigationProp<AppStackParamList, 'Root'>
>;
